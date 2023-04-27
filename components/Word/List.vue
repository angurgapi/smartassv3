<template>
  <div class="word-list">
    <div
      v-for="(word, index) in wordList"
      :key="index"
      class="word-list__item card"
    >
      {{ word }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import randomWords from 'random-words'

const props = defineProps({
  listLength: {
    type: Number,
    default: 20,
  },
})

const wordList = ref<string[]>([])

const words = randomWords({ exactly: 20, maxLength: 8 })
wordList.value.push(...words)
</script>

<style lang="scss" scoped>
.word-list {
  margin: 40px auto;
  display: grid;
  width: 100%;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 16px;
  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, 110px);
  }

  &__item {
    padding: 16px;
    text-align: center;
  }
}
</style>
