<template>
  <GameContainer>
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules>
        Memorize the pattern of tiles <br />
        and reproduce it after the timer stops
      </template>
      <template #settings>
        <div class="game-settings f-row">
          <span class="game-settings__label">Select grid size </span>
          <SelectList v-model="tilesAmount" :options="options" />
        </div>
      </template>
    </GameIntroduction>
    <div v-else class="game__action f-col">
      <template v-if="stage === 2">
        <div class="pattern-grid" :class="getGridClass">
          <div
            v-for="(tile, index) in computerArray"
            :key="index"
            class="pattern-grid__tile"
            :class="{ 'pattern-grid__tile--filled': tile === 1 }"
          />
        </div>
        <button class="btn btn--secondary" @click="shuffleArray">
          <SvgIcon name="shuffle" />
          shuffle
        </button>
      </template>
      <template v-if="stage === 3">
        <div class="pattern-grid" :class="getGridClass">
          <div
            v-for="(tile, index) of tilesAmount"
            :key="`users-${index}`"
            class="pattern-grid__tile"
            :class="{ 'pattern-grid__tile--filled': userArray[index] === 1 }"
            @click="checkTile(index)"
          />
        </div>
        <button
          class="btn btn--primary pattern-grid__compare"
          @click="comparePatterns"
        >
          Check
        </button>
      </template>
      <template v-if="stage === 4">
        <div class="game__row">
          <div class="f-col">
            <div class="pattern-grid" :class="getGridClass">
              <div
                v-for="(tile, index) of tilesAmount"
                :key="index"
                class="pattern-grid__tile"
                :class="{
                  'pattern-grid__tile--filled': computerArray[index] === 1,
                }"
              />
            </div>
            <span>Original pattern</span>
          </div>
          <div class="f-col">
            <div class="pattern-grid pattern-grid--copy" :class="getGridClass">
              <div
                v-for="(tile, index) of tilesAmount"
                :key="index"
                class="pattern-grid__tile"
                :class="{
                  'pattern-grid__tile--filled': userArray[index] === 1,
                }"
              />
            </div>
            <span>Your pattern</span>
          </div>
        </div>
        <span v-if="matchPercentage">{{ matchPercentage }}% match</span>
      </template>
    </div>
    <!-- end of body -->
    <template #footer>
      <template v-if="stage > 1">
        <GameTimer :stop-at="60" :on="stage === 2" @timeout="startCheck" />
        <button class="btn btn--restart" @click="restartGame">Restart</button>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
// definePageMeta({
//   layout: 'page',
// })
// const tilesAmount = 36
const tilesAmount = ref(16)

const stage = ref(1)

const computerArray: number[] = reactive([])
const userArray: number[] = reactive([])

const matchPercentage = ref(0)

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
  matchPercentage.value = 0
  computerArray.length = 0
  while (computerArray.length < tilesAmount.value) {
    // check if there's not enough filled tiles already
    const filledTiles = computerArray.filter((el) => el > 0)
    const proportions = filledTiles.length / tilesAmount.value
    if (proportions < 0.33) {
      computerArray.push(Math.floor(Math.random() + 0.5))
    } else computerArray.push(0)
  }
}

const shuffleArray = () => {
  for (let i = computerArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[computerArray[i], computerArray[j]] = [computerArray[j], computerArray[i]]
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
  userArray[tileIdx] = userArray[tileIdx] === 1 ? 0 : 1
}
const comparePatterns = () => {
  // console.log(computerArray)
  // console.log(userArray)
  stage.value = 4
  let matches = 0
  for (let i = 0; i < tilesAmount.value; i++) {
    if (computerArray[i] === userArray[i]) {
      matches++
    }
  }
  matchPercentage.value = (matches / tilesAmount.value) * 100
}

const restartGame = () => {
  stage.value = 1
}
</script>

<style lang="scss" scoped>
.pattern-grid {
  width: fit-content;
  margin: auto;
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
    background: $bg-light;

    &--filled {
      background: $yellow-bg;
    }
  }
  &__compare {
    margin-top: 20px;
  }
  &--copy {
    @media (min-width: 800px) {
      margin-left: 20px;
    }
  }
}
</style>
