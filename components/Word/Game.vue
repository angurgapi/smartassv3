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
        <GameTimer :on="isGameOn" :stop-at="1000" @timeout="hideList" />
        <button class="btn btn--primary" @click="stage = 1">restart</button>
      </div>
    </template>
    <template v-if="stage === 3">
      <div>do you remember the words?</div>
      <FormTextInput></FormTextInput>
    </template>
  </div>
</template>

<script lang="ts" setup>
import randomWords from 'random-words'

const stage = ref(1)
const isGameOn = ref(false)
const selectedSettings = reactive({ listLength: 20, wordLength: 8 })
const wordList = ref<string[]>([])

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
</script>

<style lang="scss" scoped>
.word-game {
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: hidden;
  &__controls {
    align-items: center;
  }
}

.game-preview {
  width: 100%;
  height: 100%;
}
</style>
