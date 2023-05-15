<template>
  <GameContainer :stage="stage">
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules>
        {{ $t('pages.patterns.rule') }}
      </template>
      <template #settings>
        <div class="game-settings f-row">
          <span class="game-settings__label">
            {{ $t('pages.patterns.selectSize') }}
          </span>
          <SelectList v-model="tilesAmount" :options="options" />
        </div>
      </template>
    </GameIntroduction>
    <div v-else class="game__action f-col">
      <template v-if="stage === 2">
        <div class="pattern-grid" :class="getGridClass">
          <PatternsTile
            v-for="(tile, index) in computerArray"
            :key="index"
            :is-filled="tile === 1"
            :size="availableTileSize"
          />
        </div>
        <div class="game__row">
          <button class="btn btn--secondary btn--block" @click="shuffleArray">
            <SvgIcon class="btn-icon" name="shuffle" />
            {{ $t('buttons.shuffleBtn') }}
          </button>
          <button class="btn btn--secondary btn--block" @click="startCheck">
            <SvgIcon class="btn-icon" name="forward" />
            {{ $t('buttons.skipBtn') }}
          </button>
        </div>
      </template>
      <template v-if="stage === 3">
        <div class="pattern-grid" :class="getGridClass">
          <PatternsTile
            v-for="(tile, index) of tilesAmount"
            :key="`users-${index}`"
            :size="availableTileSize"
            :is-filled="userArray[index] === 1"
            @click="checkTile(index)"
          />
        </div>
        <button
          class="btn btn--primary pattern-grid__compare"
          @click="comparePatterns"
        >
          {{ $t('buttons.checkBtn') }}
        </button>
      </template>
      <template v-if="stage === 4">
        <div class="game__row">
          <div class="f-col">
            <div class="pattern-grid" :class="getGridClass">
              <PatternsTile
                v-for="(tile, index) of tilesAmount"
                :key="index"
                :size="availableTileSize / 2"
                :is-filled="computerArray[index] === 1"
              />
            </div>
            <span class="game__hint">
              {{ $t('pages.patterns.originalPattern') }}</span
            >
          </div>
          <div class="f-col">
            <div class="pattern-grid pattern-grid--copy" :class="getGridClass">
              <PatternsTile
                v-for="(tile, index) of tilesAmount"
                :key="index"
                :size="availableTileSize / 4"
                :is-filled="userArray[index] === 1"
              />
            </div>
            <span class="game__hint">
              {{ $t('pages.patterns.userPattern') }}</span
            >
          </div>
        </div>
        <span v-if="matchPercentage" class="game__result"
          >{{ matchPercentage }}% {{ $t('pages.patterns.match') }}</span
        >
      </template>
    </div>
    <!-- end of body -->
    <template v-if="stage > 1" #footer>
      <GameTimer :stop-at="60" :on="stage === 2" @timeout="startCheck" />
      <button class="btn btn--restart" @click="restartGame">
        {{ $t('buttons.restartBtn') }}
      </button>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
const tilesAmount = ref(16)

const stage = ref(1)

const computerArray: number[] = reactive([])
const userArray: number[] = reactive([])

const matchPercentage = ref(0)

const availableTileSize = ref(0)

const startGame = () => {
  stage.value = 2
  calcTileSize()
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
  stage.value = 4
  let matches = 0
  for (let i = 0; i < tilesAmount.value; i++) {
    if (computerArray[i] === userArray[i]) {
      matches++
    }
  }
  matchPercentage.value = ~~((matches / tilesAmount.value) * 100)
}

const restartGame = () => {
  tilesAmount.value = 16
  stage.value = 1
}

const calcTileSize = () => {
  const pageContent = document.querySelector('.page__content')
  if (pageContent) {
    const pageContentHeight = pageContent.getBoundingClientRect().height
    const pageContentWidth = pageContent.getBoundingClientRect().width
    const smallerSide =
      pageContentHeight >= pageContentWidth
        ? pageContentWidth - 100
        : pageContentHeight * 0.5
    const availableGridSize = smallerSide
    availableTileSize.value = ~~(
      availableGridSize / Math.sqrt(tilesAmount.value)
    )
  }
}
</script>

<style lang="scss" scoped>
.pattern-grid {
  width: fit-content;
  margin: auto auto 16px auto;
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

  &__compare {
    margin-top: 20px;
  }
}
</style>
