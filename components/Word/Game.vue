<template>
  <GameContainer :stage="stage">
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules> {{ $t('pages.words.rule') }} </template>
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
          <div class="game__description justify-center f-col">
            <p>Do you remember the words?</p>
            <p class="text-sm text-gray">Type them in one by one</p>
          </div>
          <div class="word-game__row">
            <FormTextInput v-model="currentGuess" @keyup.enter="checkGuess" />
            <button class="btn word-game__submit" @click="checkGuess">
              <SvgIcon name="check" class="word-game__icon" />
            </button>
          </div>

          <div v-if="rememberedWords > 0" class="word-game__progress f-col">
            <span class="game__description"
              >Correct: {{ rememberedWords }} out of
              {{ selectedSettings.listLength }}</span
            >
            <span
              v-if="rememberedWords === selectedSettings.listLength"
              class="game__description"
              >Congratulations!
            </span>
            <div class="word-game__cache">
              <span
                v-for="(word, index) in rememberedWordsList"
                :key="index"
                class="word-game__cached"
                >{{ word }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </div>
    <template #footer>
      <template v-if="stage > 1">
        <FooterControls>
          <GameTimer :on="isGameOn" :stop-at="60" @timeout="hideList" />
          <RestartButton @click="restartGame" />
        </FooterControls>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
import randomWords from 'random-words'
import FooterControls from '../Game/FooterControls.vue'
import RestartButton from '../Game/RestartButton.vue'
const stage = ref(1)
const isGameOn = ref(false)
const selectedSettings = reactive({ listLength: 10, wordLength: 8 })
const wordList = ref<string[]>([])

const currentGuess = ref('')
const rememberedWords = ref(0)
const rememberedWordsList = ref<string[]>([])

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
  const guessCurated = currentGuess.value.toLowerCase()
  if (wordList.value.includes(guessCurated)) {
    rememberedWords.value++
    rememberedWordsList.value.push(guessCurated)
    wordList.value.splice(wordList.value.indexOf(guessCurated), 1)
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
    &:deep(.btn--restart) {
      margin-left: 20px;
    }
  }

  &__check {
    .game__description {
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
  &__cache {
    margin-top: 16px;
  }
  &__cached {
    display: inline-block;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
