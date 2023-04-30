<template>
  <div class="word-list">
    <div
      v-for="(word, index) in props.words"
      :key="index"
      class="word-list__item card"
    >
      {{ word }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  words: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.word-list {
  margin: 40px auto;
  display: grid;
  width: 100%;
  max-height: 70vh;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 16px;
  @media (max-width: 800px) {
    // grid-template-columns: repeat(auto-fill, 110px);
    grid-template-columns: repeat(auto-fill, minmax(60px, 100px));
    max-height: unset;
    grid-gap: 8px;
    margin-top: 12px;
  }

  &__item {
    padding: 0.4em;
    text-align: center;
    @media (max-width: 600px) {
      padding: 0.6em 0.3em;
    }
  }
}
</style>
