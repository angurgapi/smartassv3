<template>
  <div
    class="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-200 px-4 py-2 text-slate-800 w-[120px] shadow-sm"
    :class="{ 'border border-red-300': isEnding }"
  >
    <Clock class="h-4 w-4 text-amber-500" />
    <span class="text-sm leading-none relative top-[1.5px]"
      >{{ currentSecond }}s</span
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Clock } from 'lucide-vue-next'

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
