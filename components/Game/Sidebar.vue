<template>
  <div class="game-sidebar mt-[18px]">
    More Games
    <div class="game-sidebar__suggestions">
      <GameTile
        v-for="(game, i) in remainingGames"
        :key="i"
        :game="game"
        :is-mini="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createGamesArray } from '@/mixins/gamesArray'

const games = ref(createGamesArray())
const route = useRoute()
const gameRoute = route.fullPath.replace('/games/', '')

const remainingGames = computed(() => {
  return games.value
    .filter((game) => game.url !== gameRoute)
    .sort(() => Math.random() - 0.5)
    .slice(2)
})
</script>

<style lang="scss" scoped>
.game-sidebar {
  display: flex;
  flex-direction: column;
  // margin-top: 15px;
  // padding: 30px 18px;
  &__suggestions {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
}
</style>
