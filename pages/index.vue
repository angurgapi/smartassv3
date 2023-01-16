<template>
  <div class="page">
    <Banner />
    <div class="page__content f-col">
      <ReasonSection />
      <OfferSection />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ReasonSection from '@/components/index/ReasonSection.vue'
import OfferSection from '@/components/index/OfferSection.vue'
// composable
// const { t } = useLang()

// meta
definePageMeta({
  layout: 'index',
})

useHead(() => ({
  script: [
    {
      src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      rel: 'preload',
    },
  ],
}))

// const leadingsText = computed(() => [
//   {
//     text: titlesText.value[0] + t('pages.index.comma'),
//     startColor: '#007CF0',
//     endColor: '#00DFD8',
//     delay: 0,
//   },
//   {
//     text: titlesText.value[1],
//     startColor: '#7c6dbf',
//     endColor: '#0f0440',
//     delay: 2,
//   }
// ])
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff !important;
}
</style>
