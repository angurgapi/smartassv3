<template>
  <div class="game-sidebar">
    <nuxt-link class="game-sidebar__back" to="/games">
      {{ $t('pages.games.more') }}
    </nuxt-link>
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
  display: flex;
  flex-direction: column;
  width: 250px;
  &__suggestions {
    margin-top: 18px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  &__link {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    text-decoration: none;
    color: $primary-dark;
    font-weight: 600;
    &:visited {
      color: $primary-dark;
    }
  }
}
</style>
