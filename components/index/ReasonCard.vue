<template>
  <div class="reason-card card hidden">
    <div class="reason-card__icon">
      <img :src="`/assets/landing/${card.icon}.png`" />
    </div>
    <div class="reason-card__content" v-html="card.content" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  card: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss">
.reason-card {
  width: 100%;
  display: flex;
  padding: 20px;
  user-select: none;
  align-items: center;
  transition: 0.3s all ease-in-out;
  color: #202639;
  &:hover {
    transform: scale(1.05);
  }
  &:not(:first-child) {
    margin-top: 18px;
  }

  @media (max-width: 800px) {
    font-size: 18px;
    line-height: 19px;
  }
  @media (max-width: 500px) {
    font-size: 16px;
    line-height: 17px;
  }
  &__icon {
    display: flex;
    flex-shrink: 0;
    height: 60px;
    width: 60px;
    margin-right: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.details {
  font-size: 1rem;
  margin-top: 10px;
  opacity: 0.8;
  text-align: justify;
  transform: translateY(0);
  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 15px;
  }
}
.hidden {
  opacity: 0;
  transform: translateY(20px);
}
</style>
