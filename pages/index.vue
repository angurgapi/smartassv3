<template>
  <NuxtLayout>
    <div class="index-page">
      <IndexReasonSection />
      <IndexOfferSection />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// composable
// const { t } = useLang()

// meta
definePageMeta({
  layout: 'index',
})
</script>

<style lang="scss">
.index-page {
  width: 100%;
}
</style>
