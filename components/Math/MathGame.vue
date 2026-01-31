<template>
  <GameContainer :stage="stage">
    <GameIntroduction v-if="stage === 1" @start="startGame">
      <template #rules> {{ $t('pages.math.rule') }} </template>
    </GameIntroduction>

    <div v-else class="game__action">
      <div v-if="stage === 2" class="math-game f-col">
        <div class="math-game__container">
          <MathBubble
            v-for="(equation, index) in state.equations"
            :key="index"
            :data="equation"
          />
        </div>
        <div class="game-input">
          <FormTextInput
            v-if="state.equations.length"
            v-model="currentResult"
            type="number"
          />
          <span class="game-input__hint">
            {{ $t('pages.math.hint') }}
          </span>
        </div>
      </div>
      <div v-if="stage === 3" class="game__congrats">
        {{ $t('pages.math.result') }}: {{ solvedExpressions }}
        {{ pluralizedCount }} / {{ timerDuration }}
        {{ $t('pages.math.seconds') }}
      </div>
    </div>

    <template #footer>
      <GameTimer :on="isGameOn" :stop-at="timerDuration" @timeout="endGame" />
      <button class="btn btn--restart" @click="restartGame">
        {{ $t('buttons.restartBtn') }}
      </button>
      <div class="game__data f-col">
        <span v-if="solvedExpressions"
          >{{ $t('pages.math.solved') }} {{ solvedExpressions }}
          {{ pluralizedCount }}</span
        >
      </div>
    </template>
  </GameContainer>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { pluralizeCount } from '@/utils/pluralizeCount'

const currentResult = ref('')
const solvedExpressions = ref(0)
const isGameOn = ref(false)
const isGameOver = ref(false)

const timerDuration = 60

const stage = ref(1)

const { t } = useLang()

const state = reactive({
  equations: [] as any[],
})
const pluralizedCount = computed(() => {
  return pluralizeCount(solvedExpressions.value, t('pages.math.expressions'))
})

const startGame = () => {
  stage.value = 2
  isGameOn.value = true
  populateExpressions()
}

const restartGame = () => {
  stage.value = 2
  isGameOn.value = true
  solvedExpressions.value = 0
  state.equations.length = 0
  populateExpressions()
  setTimeout(() => {
    isGameOn.value = true
  }, 100)
}

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
  const windowWidth = window.innerWidth
  const maxExpressions = windowWidth > 600 ? 14 : 12
  while (state.equations.length < maxExpressions) {
    state.equations.push(generateEquation())
  }
}

const endGame = () => {
  isGameOn.value = false
  // isGameOver.value = true
  // solvedExpressions.value = 0
  stage.value = 3
}
</script>

<style lang="scss" scoped>
.math-game {
  margin: auto;
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
  &:deep(.timer) {
    margin-top: 20px;
  }
  &:deep(.btn--restart) {
    span {
      margin-left: 12px;
    }
  }
}

.disappear {
  opacity: 0;
}
</style>
