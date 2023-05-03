<template>
  <div class="word-game f-col">
    <template v-if="stage === 1">
      <div class="game-preview">
        <WordGameSettings @start="startGame" />
      </div>
    </template>
    <template v-if="stage === 2">
      <WordList :words="wordList" />
      <div class="word-game__controls f-row">
        <GameTimer :on="isGameOn" :stop-at="6" @timeout="hideList" />
        <button class="btn btn--restart" @click="restartGame">restart</button>
      </div>
    </template>
    <template v-if="stage === 3">
      <div class="word-game__check f-col">
        <div class="word-game__row">Do you remember the words?</div>
        <div class="word-game__row">
          <FormTextInput v-model="currentGuess" @keyup.enter="checkGuess" />
          <button class="btn word-game__submit" @click="checkGuess">
            <SvgIcon name="check" class="word-game__icon" />
          </button>
        </div>
        <div v-if="rememberedWords > 0" class="word-game__row">
          <span
            >Correct: {{ rememberedWords }} out of
            {{ selectedSettings.listLength }}</span
          >
        </div>
        <div class="word-game__row">
          <button class="btn btn--restart" @click="restartGame">restart</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import randomWords from 'random-words'

const stage = ref(1)
const isGameOn = ref(false)
const selectedSettings = reactive({ listLength: 20, wordLength: 8 })
const wordList = ref<string[]>([])

const currentGuess = ref('')
const rememberedWords = ref(0)

const startGame = (settings: any) => {
  selectedSettings.listLength = settings.listLength
  selectedSettings.wordLength = settings.wordLength
  generateList()
  stage.value = 2
  setTimeout(() => {
    isGameOn.value = true
  }, 500)
}

const generateList = () => {
  const words = randomWords({
    exactly: selectedSettings.listLength,
    maxLength: selectedSettings.wordLength,
  })
  wordList.value = []
  wordList.value.push(...words)
}
const hideList = () => {
  stage.value = 3
}

const checkGuess = () => {
  console.log(currentGuess.value)
  if (wordList.value.includes(currentGuess.value.toLowerCase())) {
    rememberedWords.value++
    currentGuess.value = ''
  }
}

const restartGame = () => {
  isGameOn.value = false
  stage.value = 1
}
</script>

<style lang="scss" scoped>
.word-game {
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: hidden;

  &__check {
    padding: 24px;
  }
  &__controls {
    width: 100%;
    background: $primary-dark;
    padding: 20px;
    align-items: center;
    &::v-deep .btn--restart {
      margin-left: 20px;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 16px;
    }
  }

  &__submit {
    margin-left: 20px;
    height: 30px;
    width: 30px;
    padding: 0;
    border-radius: 50%;
    background: $primary-dark;
  }

  &__icon {
    fill: $white;
    height: 30px;
    width: 30px;
    &:hover {
      fill: $bg-secondary;
    }
  }
}

.game-preview {
  width: 100%;
  height: 100%;
}
</style>
