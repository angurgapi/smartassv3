<template>
  <GameContainer>
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules>
        Memorize the pattern of tiles <br />
        and reproduce it after the timer stops
      </template>
      <template #settings>
        <div class="f-row">
          <span class="game-settings__label">Select grid size </span>
          <SelectList v-model="tilesAmount" :options="options" />
        </div>
      </template>
    </GameIntroduction>
    <template v-if="stage === 2">
      <div class="pattern-grid" :class="getGridClass">
        <div
          v-for="(tile, index) in tilesArray"
          :key="index"
          class="pattern-grid__tile"
          :class="{ 'pattern-grid__tile--filled': tile === 1 }"
        />
      </div>
      <GameTimer :stop-at="60" :on="stage === 2" @timeout="startCheck" />
    </template>
    <template v-if="stage === 3">
      <div class="pattern-grid" :class="getGridClass">
        <div
          v-for="(tile, index) of tilesAmount"
          :key="index"
          class="pattern-grid__tile"
          :class="{ 'pattern-grid__tile--filled': userArray[index] === 1 }"
          @click="checkTile(index)"
        />
      </div>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
// const tilesAmount = 36
const tilesAmount = ref(16)

const stage = ref(1)

const tilesArray: number[] = reactive([])
const userArray: number[] = reactive([])

const startGame = () => {
  stage.value = 2
  populateArray()
}
const options = [
  {
    label: '4 x 4',
    value: 16,
  },
  { label: '5 x 5', value: 25 },
  {
    label: '6 x 6',
    value: 36,
  },
]

const getGridClass = computed(() => {
  switch (tilesAmount.value) {
    case 25:
      return 'pattern-grid--25'
    case 36:
      return 'pattern-grid--36'
    default:
      return 'pattern-grid--16'
  }
})

const populateArray = () => {
  tilesArray.length = 0
  while (tilesArray.length < tilesAmount.value) {
    // check if there's not enough filled tiles already
    const filledTiles = tilesArray.filter((el) => el > 0)
    const proportions = filledTiles.length / tilesAmount.value
    if (proportions < 0.33) {
      tilesArray.push(Math.floor(Math.random() + 0.5))
    } else tilesArray.push(0)
  }
}

const startCheck = () => {
  stage.value = 3
  userArray.length = 0
  while (userArray.length < tilesAmount.value) {
    userArray.push(0)
  }
}

const checkTile = (tileIdx: number) => {
  if (tilesArray[tileIdx] === 1) {
    userArray[tileIdx] = 1
  }
}
</script>

<style lang="scss" scoped>
.pattern-grid {
  // width: 100%;
  display: grid;
  &--16 {
    grid-template-columns: repeat(4, 1fr);
  }
  &--25 {
    grid-template-columns: repeat(5, 1fr);
  }
  &--36 {
    grid-template-columns: repeat(6, 1fr);
  }
  &__tile {
    width: 40px;
    border: 1px solid #000;
    height: 40px;

    &--filled {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}

.game-settings {
  &__label {
    margin-right: 16px;
  }
}
</style>
