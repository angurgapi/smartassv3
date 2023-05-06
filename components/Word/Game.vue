<template>
  <GameContainer>
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules>
        Memorize as many words as possible and write them down when the time's
        out
      </template>
      <template #settings>
        <WordGameSettings @input="changeSettings" />
      </template>
    </GameIntroduction>
    <div v-else class="game__action f-col">
      <template v-if="stage === 2">
        <WordList :words="wordList" />
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

          <span v-if="rememberedWords > 0" class="game__result"
            >Correct: {{ rememberedWords }} out of
            {{ selectedSettings.listLength }}</span
          >
          <span
            v-if="rememberedWords === selectedSettings.listLength"
            class="game__result"
            >Congratulations!
          </span>
        </div>
      </template>
    </div>
    <template #footer>
      <template v-if="stage > 1">
        <GameTimer :on="isGameOn" :stop-at="60" @timeout="hideList" />
        <button class="btn btn--restart" @click="restartGame">restart</button>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
import randomWords from 'random-words'

const stage = ref(1)
const isGameOn = ref(false)
const selectedSettings = reactive({ listLength: 20, wordLength: 8 })
const wordList = ref<string[]>([])

const currentGuess = ref('')
const rememberedWords = ref(0)

const changeSettings = (settings: any) => {
  selectedSettings.listLength = settings.listLength
  selectedSettings.wordLength = settings.wordLength
}

const startGame = () => {
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
  if (wordList.value.includes(currentGuess.value.toLowerCase())) {
    rememberedWords.value++
    wordList.value.splice(
      wordList.value.indexOf(currentGuess.value.toLowerCase()),
      1
    )
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

  &__controls {
    width: 100%;
    background: $primary-dark;
    padding: 20px;
    align-items: center;
    &::v-deep .btn--restart {
      margin-left: 20px;
    }
  }

  &__check {
    .game__result {
      margin-top: 15px;
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
</style>
