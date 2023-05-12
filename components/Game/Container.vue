<template>
  <div class="game-container f-col">
    <div class="game-container__body f-col">
      <slot />
    </div>
    <div v-show="isFooterVisible" class="game-container__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  stage: {
    type: Number,
    default: 2,
  },
})

const isFooterVisible = computed(() => {
  return props.stage > 1
})
</script>

<style lang="scss" scoped>
.game-container {
  margin-top: 16px;
  background-size: contain;
  // width: 100%;
  width: 100%;
  max-width: 800px;
  // height: 100%;
  box-shadow: $box-shadow--hard;
  border-radius: 8px;
  @media (min-width: 1200px) {
    max-height: 70vh;
  }
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
      :deep(.btn) {
        margin: 12px auto;
      }
    }
  }
}
</style>
