<template>
  <div class="math-game f-col">
    <div class="math-game__container">
      <MathBubble
        v-for="(equation, index) in state.equations"
        :key="index"
        class="math-bubble"
        :data="equation"
      />
    </div>

    <!-- <input
      v-if="state.equations.length"
      v-model="currentResult"
      class="math-game__input"
      type="text"
    /> -->
    <div class="game-input">
      <FormTextInput
        v-if="state.equations.length"
        v-model="currentResult"
        type="number"
      />
      <span class="game-input__hint"> Enter any expression's result here </span>
    </div>
    <span v-if="solvedExpressions"
      >solved {{ solvedExpressions }} {{ pluralizedCount }}</span
    >
    <GameTimer :on="isGameOn" stop-at="60" @timeout="endGame" />
    <div v-if="!isGameOn" class="math-game__overlay f-col">
      <span v-if="isGameOver && solvedExpressions" class="math-game__result"
        >You've nailed {{ solvedExpressions }} {{ pluralizedCount }}
      </span>
      <button class="btn btn--restart" @click="isGameOn = true">
        play <span v-if="isGameOver">again</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { pluralizeCount } from '@/utils/pluralizeCount'

const currentResult = ref('')
const solvedExpressions = ref(0)
const isGameOn = ref(false)
const isGameOver = ref(false)

const state = reactive({
  equations: [] as any[],
})
const pluralizedCount = computed(() => {
  return pluralizeCount(solvedExpressions.value, 'expression', 'expressions')
})

const generateEquation = () => {
  let first, second, operator, result: number | null

  do {
    first = Math.floor(Math.random() * 10) + 1
    second = Math.floor(Math.random() * 10) + 1
    operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]
    switch (operator) {
      case '+':
        result = first + second
        break
      case '-':
        result = first - second
        break
      case '*':
        result = first * second
        break
      case '/':
        result = first / second
        break
      default:
        result = null
        break
    }
  } while (
    result === null ||
    !Number.isInteger(result) ||
    result <= 0 ||
    state.equations.some((eq) => eq.result === result)
  )

  return { first, second, operator, result }
}

watch(currentResult, (newValue, oldValue) => {
  if (state.equations.find((item) => item.result === +newValue)) {
    removeEquation(+newValue)
    solvedExpressions.value++
  }
})

const removeEquation = (newValue: number) => {
  setTimeout(() => {
    currentResult.value = ''
  }, 500)
  const idx = state.equations.findIndex((eq) => eq.result === +newValue)
  if (idx !== -1) {
    const nodeToReplace = document.querySelectorAll('.math-bubble')[idx]
    nodeToReplace.classList.add('disappear')
    setTimeout(() => {
      nodeToReplace.classList.remove('disappear')
      state.equations[idx] = generateEquation()
    }, 500)
  }
}
const populateExpressions = () => {
  while (state.equations.length < 10) {
    state.equations.push(generateEquation())
  }
}

const endGame = () => {
  isGameOn.value = false
  isGameOver.value = true
  solvedExpressions.value = 0
}

onMounted(() => {
  populateExpressions()
})
</script>

<style lang="scss" scoped>
.math-game {
  border-radius: 8px;
  padding: 24px;
  max-width: 600px;
  align-items: center;
  width: 90%;
  position: relative;
  &__container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  &__input {
    margin: 20px 0;
    height: 36px;
    padding: 5px;
  }

  &__overlay {
    position: absolute;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    background: rgba(33, 54, 95, 55%);
    backdrop-filter: blur(8px);
  }

  &__result {
    margin-bottom: 16px;
  }
  &::v-deep .timer {
    margin-top: 20px;
  }
  &::v-deep .btn--restart {
    span {
      margin-left: 12px;
    }
  }
}

.disappear {
  opacity: 0;
}
</style>
