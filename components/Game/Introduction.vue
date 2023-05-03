<template>
  <div class="game-intro" :style="`background-image: url(/assets/${bgImage})`">
    <div class="game-intro__inner f-col">
      <span class="game-intro__rules">
        <slot name="rules"></slot>
      </span>

      <div class="game-intro__settings f-col">
        <slot name="settings"></slot>
      </div>

      <button class="btn btn--primary" @click="$emit('start')">Go</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  bgImage: {
    type: String,
    default: 'placeholder.webp',
  },
})
</script>

<style lang="scss" scoped>
.game-intro {
  width: 100%;
  min-height: 400px;
  position: relative;
  &__inner {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 8px;
    top: 0;
    left: 0;
    background: rgba(33, 54, 95, 55%);
    backdrop-filter: blur(8px);
  }
  &__rules {
    font-weight: 600;
    font-size: 1.2em;
    text-align: center;
  }
  &__settings {
    margin-top: 20px;
  }

  .btn--primary {
    margin-top: 20px;
  }
}
</style>
