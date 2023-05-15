<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <div class="page">
        <GameSidebar />
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
