<template>
  <div class="games-grid">
    <GamesTile v-for="(game, i) in gamesArray" :key="i" :game="game" />
  </div>
</template>

<script lang="ts" setup>
import { GameData } from '~~/types/GameData'

defineProps<{
  gamesArray: GameData[]
}>()
onMounted(() => {
  console.log('kek')
})
</script>

<style lang="scss" scoped>
.games-grid {
  margin: 40px auto 40px;
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 18px;
}
</style>
