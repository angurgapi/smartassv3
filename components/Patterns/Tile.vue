<template>
  <div
    class="pattern-tile"
    :class="{ 'pattern-tile--filled': isFilled }"
    :style="`height: ${size}px; width: ${size}px`"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  size: number
  isFilled: boolean
}>()
</script>

<style lang="scss" scoped>
.pattern-tile {
  border: 1px solid #000;
  background: $bg-light;

  &--filled {
    background: $yellow-bg;
  }
}
</style>
