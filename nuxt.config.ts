import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },
  // css
  css: [
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
    '~/assets/css/tailwind.css',
    // '~/assets/sass/modules/app.scss',
  ],

  // plugins
  plugins: [
    '~/plugins/navbar.ts',
    '~/plugins/Vue3lottie.client.ts',
    '~/plugins/vue-click-outside.js',
  ],

  // build
  build: {
    transpile: ['@headlessui/vue'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/svg-sprite',
  ],

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/sass/modules/app.scss";',
        },
      },
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // content
  content: {
    documentDriven: true,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },
})
