<template>
  <NuxtLayout>
    <div class="page">
      <div class="page__content">
        <h1 class="page__title">Simon</h1>
        <p class="page__description">
          Repeat the sequence of buttons <br />
          played by the computer
        </p>
        <GameContainer>
          <SimonGame />
        </GameContainer>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>

<style lang="scss" scoped>
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
}
</style>
