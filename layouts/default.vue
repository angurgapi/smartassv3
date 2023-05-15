<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <div class="page">
        <GameSidebar v-if="screen.higherThan(Size.MEDIUM)" />
        <div class="page__content">
          <slot />
        </div>
      </div>
    </div>

    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<script lang="ts" setup>
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
</style>
