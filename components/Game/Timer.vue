<template>
  <div class="timer f-row" :class="{ 'timer--danger': isEnding }">
    <SvgIcon name="clock" />
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
  clearInterval(timerInterval)
  isEnding.value = false
  emit('timeout')
}

const checkRemainingTime = (currentSecond: number) => {
  const remainder: number = +props.stopAt - currentSecond
  if (remainder <= 5) {
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
  if (+newVal === +props.stopAt) {
    stopTimer()
  }
})

onMounted(() => {
  if (props.on) {
    startTimer()
  }
})
</script>
