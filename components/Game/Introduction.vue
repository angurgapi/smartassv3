<template>
  <div class="game-intro" :style="`background-image: url(/assets/${bgImage})`">
    <div class="game-intro__inner f-col">
      <span class="game-intro__rules">
        <slot name="rules"></slot>
      </span>

      <div class="game-intro__settings f-col">
        <slot name="settings"></slot>
      </div>

      <button class="btn btn--primary" @click="$emit('start')">
        {{ $t('buttons.goBtn') }}
      </button>
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
  height: 100%;
  min-height: 100%;

  // position: relative;
  &__inner {
    width: 100%;
    height: 100%;
    // position: absolute;
    top: 0;
    left: 0;
    background: rgba(33, 54, 95, 55%);
    backdrop-filter: blur(8px);
    padding: 12px;
    min-height: 50vh;
  }
  &__rules {
    width: 600px;
    margin-top: 16px;
    max-width: 100%;
    font-weight: 600;
    font-size: 1.1em;
    text-align: center;
  }
  &__settings {
    margin-top: 20px;
  }

  .btn--primary {
    margin-bottom: 20px;
  }
}
</style>
