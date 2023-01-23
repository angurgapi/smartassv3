<template>
  <div class="game-container f-col">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.game-container {
  @media (min-width: 900px) {
    max-height: 80vh;
  }
  @media (min-width: 600px) {
    padding: 20px;
  }
}
</style>
