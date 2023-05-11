import VueLottie from 'vue3-lottie'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLottie, {})
})
