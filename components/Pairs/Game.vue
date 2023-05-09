<template>
  <GameContainer>
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules> Try to locate the pair for each picture </template>
    </GameIntroduction>
    <div v-else class="game__action">
      <div class="game-grid">
        <PairsTile
          v-for="(img, index) in shuffledImagesArray"
          :key="index"
          :img="img"
          :revealed="currentAttemptCards.includes(index)"
          :nailed="nailedImages.includes(index)"
          @click="checkFlip(index)"
        />
      </div>
    </div>
    <template #footer>
      <template v-if="stage > 1">
        <GameTimer :on="isTimerOn" />
        <button class="btn btn--restart" @click="restartGame">Restart</button>
        <div class="game__data f-col">
          <span>Attempt: {{ currentAttemptNum }}</span>
          <span>Found pairs: {{ nailedPairsNum }}</span>
        </div>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
const imageList: string[] = [
  'Almond_blossoms',
  'Bowl_with_Daisies',
  'Evening_landscape',
  'Field_with_green_wheat',
  'Irises',
  'Irises_II',
  'Oleanders',
  'Olive_grove',
  'Olive_trees',
  'Orchard_with_cypresses',
  'Ravine',
  'Resting_at_noon',
  'Roses',
  'Starry_night',
  'The_Langlois_bridge_at_Arles',
  'Wheat_Field_with_Cypresses',
  'Wild_roses',
  'Bedroom',
]

const stage = ref(1)
const currentAttemptCards = ref<number[]>([])
const currentAttemptNum = ref(1)
const nailedImages: any[] = []
const nailedPairsNum = ref(0)
const shuffledImagesArray = ref<string[]>([])

const isTimerOn = ref(false)

let endAttemptTimeOut: any = null
// const restartKey: false;

//   watch: {
//   nailedImages(newVal) {
//     if (newVal.length == this.shuffledImagesArray.length) {
//       this.restartGame()
//     }
//   },
// },

const startGame = () => {
  stage.value = 2
  shuffledImagesArray.value = getShuffledArray(imageList)
}

const getShuffledArray = (array: string[]) => {
  return [...array, ...array].sort((a, b) => 0.5 - Math.random())
}
const checkFlip = (idx: number) => {
  //  CLICK OF AN ALREADY REVEALED CARD
  if (currentAttemptCards.value.includes(idx)) {
    return
  }

  // BEGINNING OF A NEW ATTEMPT
  if (!currentAttemptCards.value.length) {
    currentAttemptCards.value.push(idx)
    return
  }
  // THIS IS THE 2D CARD OF AN ATTEMPT & it is not a second click on the same card
  if (currentAttemptCards.value.length === 1) {
    isTimerOn.value = true
    currentAttemptCards.value.push(idx)
    const firstImgIdx = currentAttemptCards.value[0]
    const secondImgIdx = currentAttemptCards.value[1]
    // IF TWO CARDS MATCH
    if (
      shuffledImagesArray.value[firstImgIdx] ===
      shuffledImagesArray.value[secondImgIdx]
    ) {
      nailedImages.push(firstImgIdx, secondImgIdx)
      nailedPairsNum.value++
      endAttempt()
    } else {
      endAttemptTimeOut = setTimeout(() => {
        endAttempt()
      }, 5000)
    }
  }
  // NEW ATTEMPT INITIATED BY USER, NOT TIMER, PREV NOT CLEARED YET
  else if (currentAttemptCards.value.length === 2) {
    endAttempt()
    currentAttemptCards.value.push(idx)
  }
}

const endAttempt = () => {
  isTimerOn.value = false
  clearTimeout(endAttemptTimeOut)
  currentAttemptCards.value = []
  currentAttemptNum.value++
}

const restartGame = () => {
  currentAttemptCards.value = []
  currentAttemptNum.value = 1
  nailedImages.length = 0
  nailedPairsNum.value = 1
  shuffledImagesArray.value = []
  startGame()
}
</script>

<style scoped lang="scss">
.game-grid {
  width: 100%;
  display: grid;
  grid-gap: 6px;
  justify-content: center;
  grid-template-columns: repeat(9, 1fr);
  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
