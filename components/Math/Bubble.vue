<template>
  <div class="math-bubble f-row">
    <span>{{ data.first }}</span>
    <span>{{ data.operator }}</span>
    <span>{{ data.second }}</span>
  </div>
</template>

<script lang="ts" setup>
import { MathExpression } from '~~/types/MathExpression'

const props = defineProps({
  data: {
    type: Object as () => MathExpression,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.math-bubble {
  border-radius: 10px;
  padding: 12px;
  background-color: $yellow-light;
  transition: 0.4s all ease-in-out;
  box-shadow: $box-shadow--default;
  color: $primary-dark;
}
</style>
