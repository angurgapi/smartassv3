<template>
<<<<<<< HEAD
  <div class="wrapper bg-slate-100">
    <NavBar />
    <div class="wrapper__content min-h-screen">
      <div class="game-page">
        <GameSidebar v-if="!isMobileScreen" />
        <div class="game-page__content">
=======
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <div class="page">
        <GameSidebar v-if="screen.higherThan(Size.MEDIUM)" />
        <div class="page__content">
>>>>>>> origin/main
          <slot />
        </div>
      </div>
    </div>

<<<<<<< HEAD
    <Footer />
=======
    <slot name="footer">
      <Footer />
    </slot>
>>>>>>> origin/main
  </div>
</template>

<script lang="ts" setup>
<<<<<<< HEAD
import { useResponsiveMediaQuery } from '@/composables/useMediaQuery'
const { isMobileScreen } = useResponsiveMediaQuery()
</script>
<style lang="scss" scoped>
.game-page {
  flex-direction: row;
  padding: 18px;
  @media (min-width: $breakpoint-medium) {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
  }
}
=======
import { Size } from '~/composables/useScreen'

const screen = useScreen()
</script>
<style lang="scss" scoped>
.wrapper {
  &:deep(.navbar) {
    background: $gradient-blue;
  }
}

.page {
  flex-direction: row;
}
>>>>>>> origin/main
</style>
