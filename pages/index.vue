<template>
  <div class="index-page">
    <IndexReasonSection />
    <IndexOfferSection />
  </div>
</template>

<script lang="ts" setup>
// composable
// const { t } = useLang()

// meta
definePageMeta({
  layout: 'index',
})

// onBeforeMount(() => {
//   console.log('before mount')
//   debugger
// })

// useHead(() => ({
//   script: [
//     {
//       src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
//       rel: 'preload',
//     },
//   ],
// }))
</script>

<style lang="scss">
.index-page {
  width: 100%;
}
</style>
