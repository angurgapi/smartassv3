<template>
  <div class="games-grid">
    <GameTile v-for="(game, i) in gamesArray" :key="i" :game="game" />
  </div>
</template>

<script lang="ts" setup>
import { GameData } from '~~/types/GameData'

defineProps<{
  gamesArray: GameData[]
}>()
</script>

<style lang="scss" scoped>
.games-grid {
  margin: 10px auto 40px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 18px;
}
</style>
