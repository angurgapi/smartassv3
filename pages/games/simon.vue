<template>
  <div class="page">
    <h1 class="page__title">Simon</h1>
    <p class="page__description">
      Repeat the sequence of buttons <br />
      played by the computer
    </p>
    <div class="game card">
      <SimonGame />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  layout: 'game',
}
</script>

<style lang="scss" scoped>
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
}
</style>
