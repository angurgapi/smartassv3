<template>
  <NuxtLayout>
    <h1 class="page__title">{{ $t('pages.games.simonTitle') }}</h1>
    <SimonGame />
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
}
</style>
