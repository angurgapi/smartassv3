<template>
  <GameContainer :stage="stage">
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules> Locate the pair for every picture </template>
    </GameIntroduction>
    <div v-else class="game__action">
      <div v-if="stage === 2" class="game-grid">
        <PairsTile
          v-for="(img, index) in shuffledImagesArray"
          :key="index"
          :img="img"
          :revealed="currentAttemptCards.includes(index)"
          :nailed="nailedImages.includes(index)"
          @click="checkFlip(index)"
        />
      </div>
      <span v-else class="game__congrats"
        >Congratulations! You've found all the pairs</span
      >
    </div>
    <template #footer>
      <template v-if="stage > 1">
        <GameTimer :on="isTimerOn" />
        <button class="btn btn--restart" @click="restartGame">Restart</button>
        <div class="game__data f-col">
          <span>Attempt: {{ currentAttemptNum }}</span>
          <span>Found: {{ nailedPairsNum }} {{ pluralizedCount }}</span>
        </div>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
import { pluralizeCount } from '@/utils/pluralizeCount'

const imageList: string[] = [
  'Almond_blossoms',
  'Bowl_with_Daisies',
  'Evening_landscape',
  'Field_with_green_wheat',
  'Irises',
  'Oleanders',
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

const startGame = () => {
  stage.value = 2
  shuffledImagesArray.value = getShuffledArray(imageList)
}

const getShuffledArray = (array: string[]) => {
  return [...array, ...array].sort((a, b) => 0.5 - Math.random())
}
const checkFlip = (idx: number) => {
  switch (currentAttemptCards.value.length) {
    case 0:
      currentAttemptCards.value.push(idx)
      break
    case 1:
      if (currentAttemptCards.value.includes(idx)) {
        break
      } else {
        currentAttemptCards.value.push(idx)
        const [firstCard, secondCard] = currentAttemptCards.value
        if (isMatch(firstCard, secondCard)) {
          nailedImages.push(firstCard, secondCard)
          nailedPairsNum.value++
          endAttemptTimeOut = setTimeout(() => {
            endAttempt()
          }, 1000)
          break
        } else {
          isTimerOn.value = true
          endAttemptTimeOut = setTimeout(() => {
            endAttempt()
          }, 5000)
        }
        break
      }
    case 2:
      if (currentAttemptCards.value.includes(idx)) {
        break
      } else {
        endAttempt()
        currentAttemptCards.value.push(idx)
        break
      }
    default:
      break
  }
}

const isMatch = (card1: number, card2: number) => {
  return shuffledImagesArray.value[card1] === shuffledImagesArray.value[card2]
}

const endAttempt = () => {
  currentAttemptCards.value = []
  isTimerOn.value = false
  clearTimeout(endAttemptTimeOut)
  if (nailedPairsNum.value < imageList.length) {
    currentAttemptNum.value++
  } else {
    stage.value = 3
  }
}

const restartGame = () => {
  currentAttemptCards.value = []
  currentAttemptNum.value = 1
  nailedImages.length = 0
  nailedPairsNum.value = 0
  shuffledImagesArray.value = []
  startGame()
}
const pluralizedCount = computed(() => {
  return pluralizeCount(nailedPairsNum.value, 'pair, pairs')
})
</script>

<style scoped lang="scss">
.game-grid {
  width: 100%;
  display: grid;
  grid-gap: 6px;
  justify-content: center;
  grid-template-columns: repeat(8, 1fr);
  @media (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
