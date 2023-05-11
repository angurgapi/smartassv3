<template>
  <div class="tab-group">
    <div class="tab-group__navigation f-col">
      <slot name="navigation" />
    </div>
    <div class="tab-group__content">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-group {
  width: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  grid-gap: 20px;
  padding: 20px;
  align-items: flex-start;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
  &__navigation {
    margin-right: 30px;
    @media (max-width: 1000px) {
      flex-direction: row;
      width: fit-content;
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
