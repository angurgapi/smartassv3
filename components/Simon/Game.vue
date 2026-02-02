<template>
  <GameContainer :stage="stage">
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules>
        Remember the sound signal sequence and repeat it
      </template>
      <template #settings>
        <div class="game-settings f-row">
          <span class="game-settings__label"> Speed </span>
          <SimonSpeedControls v-model="gameSpeed" :options="speedOptions" />
        </div>
      </template>
    </GameIntroduction>
    <div v-else class="game__action">
      <div class="field__grid">
        <SimonSoundBtn
          v-for="btn in soundBtns"
          :key="btn.value"
          :btn="btn"
          :is-lit="currentLitBtn === btn.value"
          @click="handleUserClick(btn.value)"
        />
      </div>
    </div>

    <template #footer>
      <template v-if="stage > 1">
        <button class="btn btn--restart" @click="restartGame">Restart</button>
        <span class="game__data">Level: {{ level }}</span>
      </template>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
const soundBtns = [
  {
    value: 1,
    color: '#f5bd07',
  },
  {
    value: 2,
    color: '#040d3d',
  },
  {
    value: 3,
    color: '#0f421d',
  },
  {
    value: 4,
    color: '#47090b',
  },
]

const stage = ref(1)

const speedOptions = [
  { label: 'min', value: 800 },
  { label: 'mid', value: 400 },
  { label: 'max', value: 200 },
]

let isGameOn = false
const isUsersTurn = ref(false)
let hasUserWon = false
const gameSpeed = ref(400)

let generatedSequence: number[] = []
let userSequence: number[] = []

let sequenceInterval: NodeJS.Timeout

const level = ref(1)

const clearCurrentData = () => {
  isUsersTurn.value = false
  hasUserWon = false
  userSequence = []
  generatedSequence = []
  // clearInterval(sequenceInterval)
  clearTimeout(sequenceInterval)
}

const startGame = () => {
  stage.value = 2
  clearCurrentData()
  isGameOn = true
  generateSequence()
}

const restartGame = () => {
  clearCurrentData()
  level.value = 1
  stage.value = 1
}

const generateSequence = () => {
  for (let i = 0; i < level.value; i++) {
    const randomNum = Math.floor(Math.random() * 4) + 1
    generatedSequence.push(randomNum)
  }

  playSequence()
}

const playSequence = () => {
  let currentTile = 0

  const playNextTile = () => {
    playBtn(generatedSequence[currentTile])
    currentTile++
  }
  generatedSequence.forEach((_, index) => {
    setTimeout(playNextTile, index * gameSpeed.value)
  })
  isUsersTurn.value = true
}

const playBtn = (btn: number) => {
  const audio = new Audio(`/sounds/${btn}.mp3`)
  audio.play()
  litBtn(btn)
}

const currentLitBtn = ref(0)

const litBtn = (btn: number) => {
  currentLitBtn.value = btn
  setTimeout(() => {
    currentLitBtn.value = 0
  }, 500)
}

const handleUserClick = (btn: number) => {
  if (isUsersTurn.value) {
    playBtn(btn)
    userSequence.push(btn)
    if (userSequence.length === generatedSequence.length) {
      if (JSON.stringify(userSequence) === JSON.stringify(generatedSequence)) {
        nextLevel()
      } else {
        endGame()
      }
    }
  }
}

const nextLevel = () => {
  clearCurrentData()
  level.value++
  setTimeout(() => {
    generateSequence()
  }, 1000)
}

const endGame = () => {
  clearCurrentData()
  isGameOn = false
  const decreaseLevel = () => {
    if (level.value > 1) {
      level.value--
      setTimeout(decreaseLevel, 200)
    }
  }

  setTimeout(decreaseLevel, 200)
}
</script>

<style lang="scss" scoped>
.field {
  &__grid {
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: auto;
  }
}

.rotated {
  animation: rotate 0.2s linear;
}
@keyframes rotate {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
