<template>
  <div class="wrapper bg-slate-100">
    <NavBar />
    <div class="wrapper__content min-h-screen">
      <div class="game-page">
        <GameSidebar v-if="!isMobileScreen" />
        <div class="game-page__content">
          <slot />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
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
</style>
