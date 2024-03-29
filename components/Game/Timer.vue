<template>
  <div class="timer f-row" :class="{ 'timer--danger': isEnding }">
    <!-- <SvgIcon name="clock" /> -->
    <svg-icon name="clock" />
    <span>{{ currentSecond }}s</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits(['timeout'])

const props = defineProps({
  stopAt: {
    type: [String, Number],
    default: null,
  },
  on: {
    type: Boolean,
    default: false,
  },
})

const currentSecond = ref(0)
const isEnding = ref(false)
let timerInterval: any = null

const startTimer = () => {
  currentSecond.value = 0
  timerInterval = setInterval(() => {
    currentSecond.value++
  }, 1000)
}

const stopTimer = () => {
  isEnding.value = false
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
    currentSecond.value = 0

    if (props.on) {
      emit('timeout')
    }
  }
}

const checkRemainingTime = (currentSecond: number) => {
  const remainder: number = +props.stopAt - currentSecond
  if (props.stopAt && remainder <= 5) {
    isEnding.value = true
  }
}

watch(
  () => props.on,
  (newValue) => {
    if (newValue) {
      startTimer()
    } else {
      stopTimer()
    }
  }
)
watch(currentSecond, (newVal) => {
  checkRemainingTime(newVal)
  if (props.stopAt && +newVal === +props.stopAt) {
    stopTimer()
  }
})

onMounted(() => {
  if (props.on) {
    startTimer()
  }
})
</script>

<style lang="scss" scoped>
.timer {
  height: 42px;
  width: 130px;
  border-radius: 20px;
  border: 2px solid $primary-dark;
  line-height: 20px;
  font-size: 20px;
  color: $primary-dark;
  padding: 12px;
  background: #fff;
  svg {
    height: 18px;
    width: 18px;
    fill: $primary-dark;
    margin-right: 10px;
  }
  span {
    margin-top: 2px;
  }
  &--danger {
    border: 2px solid $danger;
  }
  @media (max-width: 350px) {
    font-size: 17px;
    svg {
      margin-right: 5px;
    }
  }
}
</style>
