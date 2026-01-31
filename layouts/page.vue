<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &:deep(.navbar) {
    background-color: rgba(17, 24, 39, 0.9);
  }
  &:deep(.navbar__link) {
    color: $white;
  }
}
</style>
