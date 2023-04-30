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
    }
  }
)
watch(currentSecond, (newVal) => {
  checkRemainingTime(newVal)
  if (+newVal === +props.stopAt) {
    stopTimer()
  }
})
// export default {
//   name: 'Timer',
//   props: {
//     stopAt: {
//       type: [String, Number],
//       default: null
//     },
//     on: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data: () => ({
//     currentSecond: 0,
//     timerInterval: null
//   }),
//   watch: {
//     on: {
//       handler: function (newVal) {
//         if (newVal) {
//           this.startTimer()
//         } else {
//           this.stopTimer()
//         }
//       }
//     },
//     currentSecond: {
//       handler: function (newVal) {
//         if (this.stopAt && newVal == +this.stopAt) {
//           this.stopTimer()
//         }
//       }
//     }
//   },
//   methods: {
//     startTimer() {
//       this.currentSecond = 0
//       this.timerInterval = setInterval(() => {
//         // if (this.currentSecond < +this.stopAt && this.on) {
//         //   this.currentSecond++
//         // }
//         this.currentSecond++
//       }, 1000)
//     },

//     stopTimer() {
//       clearInterval(this.timerInterval)
//       this.$emit('timeout')
//       this.$emit('report', this.currentSecond)
//     }
//   }
// }
</script>
