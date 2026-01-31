<template>
  <section class="landing-section offer-section">
    <div class="landing-section__inner f-col">
      <h2 class="landing-section__title">
        {{ $t('index.offer_block.title') }}
      </h2>
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

      <p class="landing-section__text" v-html="getTextHtml" />

      <nuxt-link class="btn btn--primary mt-20" to="/games">{{
        $t('buttons.goBtn')
      }}</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
const Vue3Lottie = defineAsyncComponent(() =>
  import('vue3-lottie').then((m) => ({ default: m.Vue3Lottie }))
)
const { t } = useLang()

const getTextHtml = computed(() => {
  const bodyText = t('index.offer_block.body')
  return bodyText.replace(/\n/g, '<br>')
})
</script>

<style lang="scss" scoped>
.offer-section {
  background: linear-gradient(180deg, #6a9899 0, #fffade 100%);
  &:deep(.landing-section__animation) {
    width: 100%;
  }
}
</style>
