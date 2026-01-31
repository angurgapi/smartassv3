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
<<<<<<< HEAD
  grid-gap: 30px;

=======
  grid-gap: 20px;
  padding: 20px;
>>>>>>> origin/main
  align-items: flex-start;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
  &__navigation {
<<<<<<< HEAD
    align-items: end;
    @media (max-width: 1000px) {
      flex-direction: row;
      width: fit-content;
      gap: 20px;
=======
    margin-right: 30px;
    @media (max-width: 1000px) {
      flex-direction: row;
      width: fit-content;
>>>>>>> origin/main
    }
  }

  &__content {
    width: 100%;
  }
}
</style>
