<template>
  <div class="game-sidebar f-col">
    More
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

const { t } = useLang()
const games = ref(createGamesArray(t))
const route = useRoute()
const localeSetting = useState<string>('locale.setting')
const gameRoute = route.fullPath.replace('/games/', '')

watch(localeSetting, () => {
  games.value = createGamesArray(t)
})

const remainingGames = computed(() => {
  return games.value
    .filter((game) => game.url !== gameRoute)
    .sort(() => Math.random() - 0.5)
    .slice(2)
})
</script>

<style lang="scss" scoped>
.game-sidebar {
  @media (max-width: 900px) {
    display: none;
  }
  margin-top: 15px;
  padding: 18px;
  width: 150px;
  &__suggestions {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
}
</style>
