<template>
  <nuxt-link :to="`/games/${game.url}`" class="game-card">
    <img class="game-card__cover" :src="`/assets/games/${game.image}.png`" />

    <div class="game-card__body dark:text-white">
      <p class="game-card__title">{{ game.title }}</p>
      <span class="game-card__description">{{ game.description }}</span>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { GameData } from '~~/types/GameData'

const props = defineProps<{
  game: GameData
}>()
</script>

<style lang="scss" scoped>
.game-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  box-shadow: -1px 0px 8px 0px rgba(34, 60, 80, 0.17);
  transition: 0.3s all ease-in-out;
  border-radius: 8px;

  &:hover {
    box-shadow: -1px 0px 10px 0px rgba(34, 60, 80, 0.27);
  }
  &__cover {
    width: 100%;
    height: 50%;
    min-height: 125px;
    background-size: cover;
    background-size: contain;
    background-position: center;
    border-radius: 8px 8px 0 0;
  }
  &__body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__title {
    font-size: 20px;
    margin: 10px 0 10px 0;
    font-weight: 600;
  }
  &__description {
    font-size: 16px;
  }
}
</style>
