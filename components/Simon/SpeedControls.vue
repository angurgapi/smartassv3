<template>
  <div class="game__speed">
    <button
      v-for="(option, index) in options"
      :key="index"
      class="btn speed-btn"
      :class="{ 'speed-btn--active': currentMode === option.value }"
      @click="setSpeed(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
export interface SpeedOption {
  label: string
  value: number
}
const props = defineProps({
  options: {
    type: Array as () => SpeedOption[],
    required: true,
  },
})

const emit = defineEmits(['change'])

const currentMode = ref(400)

const setSpeed = (mode: number) => {
  currentMode.value = mode
  emit('change', currentMode.value)
}
</script>

<style lang="scss" scoped>
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
