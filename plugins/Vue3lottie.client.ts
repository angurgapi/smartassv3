import VueLottie from 'vue3-lottie'

export default defineNuxtPlugin((nuxtApp, nuxtOptions = {}) => {
  nuxtApp.vueApp.use(VueLottie)
})
