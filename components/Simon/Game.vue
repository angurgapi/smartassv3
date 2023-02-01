<template>
  <div class="field f-col">
    <div class="field__game">
      <button ref="startBtn" class="btn start-btn" @click="startGame">
        {{ startBtnText }}
      </button>

      <div class="field__grid">
        <SimonSoundBtn
          v-for="btn in soundBtns"
          :key="btn.value"
          :btn="btn"
          :is-lit="currentLitBtn === btn.value"
          @click="handleUserClick"
        />
      </div>
    </div>
    <span class="game__value">Level: {{ level }}</span>

    <span class="game__value">Choose speed </span>
    <div class="game__speed">
      <button
        v-for="(mode, index) in speedOptions"
        :key="index"
        class="btn speed-btn"
        :class="{ 'speed-btn--active': gameSpeed === mode.value }"
        @click="setSpeed(mode.value)"
      >
        {{ mode.description }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, Component } from 'vue'

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

const show = ref(0)

const speedOptions = [
  { value: 'easy', description: 'min', speed: 1500 },
  { value: 'normal', description: 'mid', speed: 1000 },
  { value: 'hard', description: 'max', speed: 400 },
]

let isGameOn = false
let isUsersTurn = false
let hasUserWon = false
const gameSpeed = ref('normal')

let generatedSequence: number[] = []
let userSequence: number[] = []

let sequenceInterval: NodeJS.Timeout
let level = 1
let startBtnText = 'start'

// user events
const setSpeed = (mode: string) => {
  gameSpeed.value = mode
}

const clearCurrentData = () => {
  isUsersTurn = false
  hasUserWon = false
  userSequence = []
  generatedSequence = []
  clearInterval(sequenceInterval)
}

const startGame = () => {
  clearCurrentData()
  level = 1
  isGameOn = true
  startBtnText = 'restart'
  generateSequence()
  animateStartBtn()
}

const generateSequence = () => {
  for (let i = 0; i < level; i++) {
    const randomNum = Math.floor(Math.random() * 4) + 1
    generatedSequence.push(randomNum)
  }

  playSequence()
}

const playSequence = () => {
  let currentTile = 0
  const chosenInterval = speedOptions.find(
    (mode) => mode.value === gameSpeed.value
  )?.speed
  sequenceInterval = setInterval(() => {
    if (currentTile >= generatedSequence.length) {
      clearInterval(sequenceInterval)
      isUsersTurn = true
    } else {
      playBtn(generatedSequence[currentTile])
      currentTile++
    }
  }, chosenInterval)
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
  if (isUsersTurn) {
    playBtn(btn)
    userSequence.push(btn)
    if (userSequence.length === generatedSequence.length) {
      console.log('time to compare two sequences')
      if (JSON.stringify(userSequence) === JSON.stringify(generatedSequence)) {
        console.log('they match')
        nextLevel()
      } else {
        console.log('user fucked up')
        endGame()
      }
    }
  }
}

const nextLevel = () => {
  level++
  clearCurrentData()
  setTimeout(() => {
    generateSequence()
  }, 1000)
}

const endGame = () => {
  clearCurrentData()
  isGameOn = false
  startBtnText = 'start'
  setInterval(() => {
    while (level > 1) {
      level--
    }
  }, 300)
}

const animateStartBtn = () => {
  const startBtn = ref(null)
  if (startBtn.value) {
    rotateBtn(startBtn.value)
  }
}

const rotateBtn = (el: HTMLElement) => {
  el.classList.add('rotated')
  setTimeout(() => {
    el.classList.remove('rotated')
  }, 1000)
}
</script>

<style lang="scss" scoped>
.field {
  &__game {
    position: relative;
    margin-bottom: 30px;
  }
  &__grid {
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}
button {
  font-family: 'Josefin';
  border-radius: 5px;
}
.start-btn {
  position: absolute;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  top: 25%;
  left: 25%;
  z-index: 10;
  height: 100px;
  width: 100px;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  font-size: 24px;
  background-color: #fffade;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.29), 0 6px 6px rgba(0, 0, 0, 0.43);
  }
}
.speed-btn {
  border: 2px solid #2c3e50;
  opacity: 0.7;
  &:first-child {
    background-color: #e6d21e;
  }
  &:nth-child(2) {
    background-color: #738bf5;
  }
  &:nth-child(3) {
    background-color: #963f52;
  }

  &--active {
    transform: scale(1.2);
    opacity: 0.9;
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
