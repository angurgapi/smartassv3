<template>
  <button
    class="sound-btn"
    :class="{ 'sound-btn--lit': isLit }"
    :style="`background-color:${btn.color}`"
    @click="$emit('click')"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SoundBtn } from '~~/types/SoundBtn'

const props = defineProps<{
  btn: SoundBtn
  isLit: boolean
}>()

const emit = defineEmits<{
  (e: 'click', value: number): void
}>()
// const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.sound-btn {
  outline: none;
  border: none;
  user-select: none;
  cursor: pointer;
  width: 100px;
  height: 100px;
  -webkit-tap-highlight-color: transparent;
  // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-shadow: rgba(0, 0, 0, 0.34) 0px 3px 8px;
  opacity: 0.6;
  transition: 0.2s all ease-in-out;

  &--lit {
    opacity: 1;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 15px;
    transform: scale(1.014);
  }
  &:first-child {
    border-radius: 300px 0 0 0;
  }

  &:nth-child(2) {
    border-radius: 0 300px 0 0;
  }
  &:nth-child(3) {
    border-radius: 0 0 0 300px;
  }
  &:nth-child(4) {
    border-radius: 0 0 300px 0;
  }
}
</style>
