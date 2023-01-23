<template>
  <div class="page">
    <div class="page__content">
      <h1 class="page__title">Patterns</h1>
      <p class="page__description">
        Repeat the pattern of tiles <br />
        after it disappears
      </p>
      <GameContainer>
        <div class="pattern-grid">
          <div
            v-for="(tile, index) in tilesArray"
            :key="index"
            class="pattern-grid__tile"
            :class="{ 'pattern-grid__tile--filled': tile === 1 }"
          />
        </div>
      </GameContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
const tilesAmount = 36
const tilesArray = reactive([])

onBeforeMount(() => {
  for (let i = 0; i < tilesAmount; i++) {
    tilesArray.push(Math.floor(Math.random() + 0.5))
  }
})
</script>

<style lang="scss" scoped>
.pattern-grid {
  // width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  &__tile {
    width: 40px;
    border: 1px solid #000;
    height: 40px;

    &--filled {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>
