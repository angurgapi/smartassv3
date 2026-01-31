<template>
<<<<<<< HEAD
  <div
    class="game-container mt-2 h-full rounded-xl shadow-md border border-slate-200 flex bg-white flex-col justify-between p-2"
  >
    <div class="game-container__body f-col">
      <slot />
    </div>
    <div v-show="isFooterVisible" class="w-full">
=======
  <div class="game-container f-col">
    <div class="game-container__body f-col">
      <slot />
    </div>
    <div v-show="isFooterVisible" class="game-container__footer">
>>>>>>> origin/main
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
<<<<<<< HEAD
  // margin-top: 16px;
  // background-size: contain;
  // width: 100%;
  // // max-width: 800px;
  // height: 100%;
  // box-shadow: $box-shadow--hard;
  // border-radius: 8px;
  // @media (min-width: 1200px) {
  //   max-height: 100%;
  // }

  // &__body {
  //   width: 100%;
  //   height: 100%;
  //   justify-content: center;
  //   align-items: center;
  //   background: $white;
  //   @media (max-width: 500px) {
  //     min-height: 50vh;
  //   }
  // }
  // &__footer {
  //   width: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   padding: 16px;
  //   background: $primary-dark;
  //   &:deep(.btn) {
  //     margin-left: 20px;
  //   }

  //   @media (max-width: 800px) {
  //     flex-direction: column;
  //     :deep(.btn) {
  //       margin: 12px auto;
  //     }
  //   }
  // }
=======
  margin-top: 16px;
  background-size: contain;
  width: 100%;
  max-width: 800px;
  height: 100%;
  box-shadow: $box-shadow--hard;
  border-radius: 8px;
  @media (min-width: 1200px) {
    max-height: 100%;
  }

  &__body {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: $white;
    @media (max-width: 500px) {
      min-height: 50vh;
    }
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
>>>>>>> origin/main
}
</style>
