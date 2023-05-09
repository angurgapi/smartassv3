<template>
  <div class="game-container f-col">
    <div class="game-container__body f-col">
      <slot />
    </div>
    <div class="game-container__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-container {
  // background: $yellow-bg;
  background-size: contain;
  width: 100%;
  max-width: 900px;
  height: 100%;
  box-shadow: $box-shadow--hard;
  border-radius: 8px;
  @media (min-width: 1200px) {
    max-height: 80vh;
  }
  // @media (min-width: 600px) {
  //   padding: 20px;
  // }
  &__body {
    width: 100%;
    justify-content: center;
    align-items: center;
    background: $white;
  }
  &__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: $primary-dark;
    &::v-deep .btn {
      margin-left: 20px;
    }

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }
}
</style>
