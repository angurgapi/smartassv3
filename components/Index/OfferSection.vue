<template>
  <section class="landing-section offer-section">
    <div class="landing-section__inner f-col">
      <h2 class="landing-section__title">What's on the table</h2>

      <vue3-lottie
        animation-link="/lottie/brain-bulb-with-gears.json"
        class="landing-section__animation"
        loop
        width="100%"
        height="100%"
        auto-play
      />

      <p class="landing-section__text">
        Brain fitness is just like pilates or morning jogging: you succeed after
        <span class="highlighted">continious practice</span>.<br />
        If you're ready to try, we offer several kinds of exercises.<br />
        Some of them are inspired by good old children
        <span class="highlighted">games</span>. Some are borrowed from the
        system developed by Ryuta Kawashima, a japanese
        <span class="highlighted">neuroscientist</span>.
      </p>

      <nuxt-link class="btn btn--primary mt-20" to="/games">Work out</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
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
