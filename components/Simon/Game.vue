<template>
  <div class="field f-col">
    <div class="field__game">
      <button class="btn start-btn" @click="startGame">{{ getBtnText }}</button>

      <div class="field__grid">
        <SimonSoundBtn
          v-for="btn in soundBtns"
          :key="btn.value"
          :ref="btn.value"
          :btn="btn"
          @click="handleClick"
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

<script>
export default {
  name: 'SimonGame',
  data: () => ({
    speedOptions: [
      { value: 'easy', description: 'min', speed: 1500 },
      { value: 'normal', description: 'mid', speed: 1000 },
      { value: 'hard', description: 'max', speed: 400 },
    ],
    isGameOn: false,
    isUsersTurn: false,
    hasUserWon: false,
    gameSpeed: 'normal',
    level: 1,
    generatedSequence: [],
    sequenceInterval: null,
    userSequence: [],
    soundBtns: [
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
    ],
  }),
  computed: {
    getBtnText() {
      return this.isGameOn ? 'Restart' : 'Start'
    },
  },

  methods: {
    setSpeed(mode) {
      this.gameSpeed = mode
    },

    // start game
    startGame() {
      this.isGameOn = true
      this.hasUserWon = false
      clearInterval(this.sequenceInterval)
      this.generateSequence()
    },

    // get random array of btn clicks
    generateSequence() {
      this.generatedSequence = []
      this.userSequence = []
      this.isUsersTurn = false
      for (let i = 0; i < this.level; i++) {
        const randomNum = Math.floor(Math.random() * 4) + 1
        this.generatedSequence.push(randomNum)
      }

      this.playSequence()
    },
    handleClick(btn) {
      this.userSequence.push(btn)
      if (this.userSequence.length === this.generatedSequence.length) {
        if (
          JSON.stringify(this.userSequence) ===
          JSON.stringify(this.generatedSequence)
        ) {
          this.level++
          setTimeout(() => {
            this.startGame()
          }, 1000)
        } else {
          setInterval(() => {
            if (this.level > 1) {
              this.level--
            }
          }, 200)
          this.isGameOn = false
        }
      }
    },

    playSequence() {
      let currentTile = 0
      const chosenInterval = this.speedOptions.find(
        (mode) => mode.value === this.gameSpeed
      ).speed
      this.sequenceInterval = setInterval(() => {
        if (currentTile >= this.generatedSequence.length) {
          clearInterval(this.sequenceInterval)
          this.isUsersTurn = true
        } else {
          this.playBtn(this.generatedSequence[currentTile])
          currentTile++
        }
      }, chosenInterval)
    },
    playBtn(idx) {
      this.$refs[idx][0].playBtn()
    },
  },
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
</style>
