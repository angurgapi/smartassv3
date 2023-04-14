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
            v-for="(tile, index) in getArray"
            :key="index"
            class="pattern-grid__tile"
            :class="{ 'pattern-grid__tile--filled': tile === 1 }"
          />
        </div>
      </GameContainer>
      <Timer :stop-at="10000" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
const tilesAmount = 36

const getArray = computed(() => {
  const tilesArray: number[] = []
  for (let i = 0; i < tilesAmount; i++) {
    // check if there's not enough filled tiles already
    const filledTiles = tilesArray.filter((el) => el > 0)
    const proportions = filledTiles.length / tilesAmount
    if (proportions < 0.33) {
      tilesArray.push(Math.floor(Math.random() + 0.5))
    } else tilesArray.push(0)
  }
  return tilesArray
})

// onBeforeMount(() => {
//   for (let i = 0; i < tilesAmount; i++) {
//     //check if there's not enough filled tiles already
//     let filledTiles = tilesArray.filter((el) => el > 0)
//     let proportions = filledTiles.length / tilesAmount
//     if(proportions < 0.33) {
//       tilesArray.push(Math.floor(Math.random() + 0.5))
//     }
//     else tilesArray.push(0)

//   }
// })
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
