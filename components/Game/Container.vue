<template>
  <div class="game-container f-col">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.game-container {
  // background: $yellow-bg;
  background-size: contain;
  width: 100%;
  max-width: 900px;
  height: 100%;
  border: 2px solid $primary-dark;
  @media (min-width: 1200px) {
    max-height: 80vh;
  }
  @media (min-width: 600px) {
    padding: 20px;
  }
}
</style>
