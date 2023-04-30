<template>
  <div class="game-container f-col">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.game-container {
  background: $yellow-bg;
  width: 100%;
  max-width: 900px;
  height: 100%;
  border-radius: 8px;
  @media (min-width: 1200px) {
    max-height: 80vh;
  }
  @media (min-width: 600px) {
    padding: 20px;
  }
}
</style>
