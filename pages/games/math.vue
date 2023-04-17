<template>
  <div class="page">
    <div class="page__content">
      <h1 class="page__title">Math bubbles</h1>
      <p class="page__description">
        Solve as many math equasions <br />
        as you can
      </p>

      <div class="math-container">
        <MathBubble
          v-for="(equation, index) in state.equations"
          :key="index"
          class="math-bubble"
          :data="equation"
        />
      </div>

      <input
        v-if="state.equations.length"
        v-model="currentResult"
        class="math-input"
        type="text"
      />
      <span v-if="solvedExpressions"
        >solved {{ solvedExpressions }} {{ pluralizedCount }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { pluralizeCount } from '@/utils/pluralizeCount'

definePageMeta({
  layout: 'page',
})
const currentResult = ref('')
const solvedExpressions = ref(0)

const state = reactive({
  equations: [] as any[],
})
const pluralizedCount = computed(() => {
  return pluralizeCount(solvedExpressions.value, 'expression', 'expressions')
})
// const getDisplayedEquations = computed(() => {
//   return equations
// })

// const generateEquation = () => {
//   const first = Math.floor(Math.random() * 10) + 1
//   const second = Math.floor(Math.random() * 10) + 1
//   const operators = ['+', '-', '*', '/']
//   const operator = operators[Math.floor(Math.random() * operators.length)]
//   let result = 0

//   switch (operator) {
//     case '+':
//       result = first + second
//       break
//     case '-':
//       result = first - second
//       break
//     case '*':
//       result = first * second
//       break
//     case '/':
//       result = first / second
//       break
//   }
//   if (Number.isInteger(result) && result > 0) {
//     // state.equations.push({ first, second, operator, result })
//     return { first, second, operator, result }
//   }
//   else {
//     generateEquation()
//   }
// }
const generateEquation = () => {
  let first, second, operator, result

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
  } while (result === null || !Number.isInteger(result) || result <= 0)

  return { first, second, operator, result }
}

watch(currentResult, (newValue, oldValue) => {
  if (state.equations.find((item) => item.result === +newValue)) {
    removeEquation(+newValue)
    currentResult.value = ''
    solvedExpressions.value++
    // setTimeout(() => {
    //   populateExpressions()
    // }, 1000)
  }
})

const removeEquation = (newValue: number) => {
  const index = state.equations.findIndex((eq) => eq.result === +newValue)
  console.log(index)
  console.log(document.querySelectorAll('.math-bubble')[index])
  // if (index !== -1) {
  //   state.equations.splice(index, 1)
  // }
}
const populateExpressions = () => {
  while (state.equations.length < 10) {
    state.equations.push(generateEquation())
  }
}
onMounted(() => {
  populateExpressions()
})
</script>

<style lang="scss" scoped>
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
}
.math-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
