<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <slot />
    </div>

    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &:deep(.navbar) {
    background-color: rgba(17, 24, 39, 0.9);
  }
}
</style>
