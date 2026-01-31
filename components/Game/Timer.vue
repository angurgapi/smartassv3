<template>
<<<<<<< HEAD
  <div
    class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-200 px-4 py-2 text-slate-800 w-[120px] shadow-sm"
    :class="{ 'border border-red-300': isEnding }"
  >
    <Clock class="h-4 w-4 text-amber-500" />
    <span class="text-sm leading-none relative top-[1.5px]"
      >{{ currentSecond }}s</span
    >
=======
  <div class="timer f-row" :class="{ 'timer--danger': isEnding }">
    <!-- <SvgIcon name="clock" /> -->
    <svg-icon name="clock" />
    <span>{{ currentSecond }}s</span>
>>>>>>> origin/main
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
<<<<<<< HEAD
import { Clock } from 'lucide-vue-next'
=======
>>>>>>> origin/main

const emit = defineEmits(['timeout'])

const props = defineProps({
<<<<<<< HEAD
=======
  stopAt: {
    type: [String, Number],
    default: null,
  },
>>>>>>> origin/main
  on: {
    type: Boolean,
    default: false,
  },
})

<<<<<<< HEAD
const currentSecond = ref(60)
const isEnding = ref(false)
let timerInterval: NodeJS.Timeout | null = null

const startTimer = () => {
  currentSecond.value = 60
  isEnding.value = false
  timerInterval = setInterval(() => {
    currentSecond.value--

    if (currentSecond.value <= 5 && currentSecond.value > 0) {
      isEnding.value = true
    }

    if (currentSecond.value <= 0) {
      stopTimer()
    }
=======
const currentSecond = ref(0)
const isEnding = ref(false)
let timerInterval: any = null

const startTimer = () => {
  currentSecond.value = 0
  timerInterval = setInterval(() => {
    currentSecond.value++
>>>>>>> origin/main
  }, 1000)
}

const stopTimer = () => {
<<<<<<< HEAD
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  currentSecond.value = Math.max(0, currentSecond.value)
  isEnding.value = false
  emit('timeout')
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
=======
watch(currentSecond, (newVal) => {
  checkRemainingTime(newVal)
  if (props.stopAt && +newVal === +props.stopAt) {
    stopTimer()
  }
})
>>>>>>> origin/main

onMounted(() => {
  if (props.on) {
    startTimer()
  }
})
<<<<<<< HEAD

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
=======
>>>>>>> origin/main
</script>

<style lang="scss" scoped>
.timer {
<<<<<<< HEAD
  height: 52px;
  width: 145px;
  border-radius: 24px;
  border: 2px solid $primary-dark;
  line-height: 24px;
  font-size: 20px;
  color: $primary-dark;
  padding: 12px 16px;
  background: #fff;
  gap: 8px;
  svg {
    flex-shrink: 0;
    color: $primary-dark;
  }
  span {
    margin-top: 0;
=======
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
>>>>>>> origin/main
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
