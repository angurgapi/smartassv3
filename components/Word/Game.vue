<template>
  <div class="word-game f-col">
    <template v-if="stage === 1">
      <div class="game-preview">
        <WordGameSettings v-model="selectedSettings" @start="stage = 2" />
      </div>
    </template>
    <template v-if="stage === 2">
      <WordList :settings="selectedSettings" />
    </template>
  </div>
</template>

<script lang="ts" setup>
const stage = ref(1)
const selectedSettings = ref({ listLength: 20, wordLength: 8 })
</script>

<style lang="scss" scoped>
.word-game {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  max-width: 1000px;
  align-items: center;
}

.game-preview {
  background: $yellow-bg;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 400px;
}
</style>
