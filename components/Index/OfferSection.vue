<template>
  <section class="landing-section offer-section">
    <div class="landing-section__inner f-col">
      <h2 class="landing-section__title">How We'll Train</h2>
      <client-only>
        <vue3-lottie
          animation-link="/lottie/brain-bulb-with-gears.json"
          class="landing-section__animation"
          loop
          width="100%"
          height="100%"
          auto-play
        />
      </client-only>

      <p class="landing-section__text">
        Brain training is like pilates or morning runs: regular practice will
        help you achieve success.<br />
        If you're ready to try, we offer several types of exercises.<br />
        Some are based on children's games. Others are borrowed from the methods
        of Ryuta Kawashima, a Japanese neuroscientist.
      </p>

      <nuxt-link class="btn btn--primary mt-20" to="/games">Start</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
const components = { Vue3Lottie }
</script>

<style lang="scss" scoped>
.offer-section {
  background: linear-gradient(180deg, #6a9899 0, #fffade 100%);
  &:deep(.landing-section__animation) {
    width: 100%;
  }
}
</style>
