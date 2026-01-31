<template>
  <nuxt-link :to="`/games/${game.url}`" class="game-card">
    <div
      class="game-card__cover"
      :style="`background-image: url(/assets/${getImgUrl})`"
    />
    <div class="game-card__body">
      <p class="game-card__title">{{ game.title }}</p>
      <span v-if="!isMini" class="game-card__description">{{
        game.description
      }}</span>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { GameData } from '~~/types/GameData'

const props = defineProps({
  game: {
    type: Object as PropType<GameData>,
    required: true,
  },
  isMini: {
    type: Boolean,
    default: false,
  },
})

const getImgUrl = computed(() => {
  return props.game.image ? `games/${props.game.image}.png` : 'placeholder.webp'
})
</script>

<style lang="scss" scoped>
.game-card {
  width: 100%;
<<<<<<< HEAD
  display: flex;
  flex-direction: column;
  height: auto;
=======
  display: grid;
  grid-template-columns: 1fr;
>>>>>>> origin/main
  box-shadow: $box-shadow--default;
  transition: 0.3s all ease-in-out;
  border-radius: 8px;
  background: $primary-dark;
  color: $white;
<<<<<<< HEAD
  overflow: hidden;
=======
>>>>>>> origin/main

  &:hover {
    box-shadow: -1px 0px 10px 0px rgba(34, 60, 80, 0.27);
  }
  &__cover {
    width: 100%;
    height: 100%;
    min-height: 100px;
    background-size: cover;
    background-position: center;
    aspect-ratio: 4/3;
    border-radius: 8px 8px 0 0;
  }
  &__body {
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__title {
    font-size: 20px;
    margin: 0;
    font-weight: 600;
  }
  &__description {
    font-size: 16px;
  }
}
</style>
