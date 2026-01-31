<template>
  <nav ref="navbar" class="navbar">
    <div class="navbar__inner">
      <div class="navbar__left">
        <nuxt-link class="navbar__link f-row" to="/">
          <img class="navbar__icon" src="/assets/brain.png" />
          smartass</nuxt-link
        >
      </div>
      <div class="navbar__right f-row">
        <nuxt-link class="navbar__link" to="/games">{{
          $t('pages.games.nav')
        }}</nuxt-link>
        <!-- <LanguageSwitcher /> -->
        <!-- <ThemeSwitcher /> -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSticky } from '~/composables/useSticky'
const navbar = ref(null)

onMounted(() => {
  if (!navbar.value) return
  // scroll
  const { onScroll } = useSticky(navbar.value, 0)
  setTimeout(() => onScroll(), 50)
})
</script>

<style lang="scss">
.navbar {
  height: 48px;
  width: 100%;
  max-width: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease-in-out;
  padding: 0;

  &__inner {
    width: 100%;
    display: flex;
    max-width: 1200px;
    padding: 12px 18px;
    justify-content: space-between;
    @media (max-width: 1150px) {
      padding: 0 18px;
    }
  }

  // &__left {
  //   margin-left: 20px;
  // }

  // &__right {
  //   margin-right: 20px;
  // }

  &__icon {
    margin-right: 10px;
    height: 32px;
    width: 32px;
  }

  &__link {
    font-size: 22px;
    color: $primary-dark;
    letter-spacing: 0.6px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.1em;
      background-color: rgba(255, 255, 255, 0.7);
      opacity: 0;
      transition: opacity 300ms, transform 300ms;
    }

    &:hover::after,
    &:focus::after {
      opacity: 1;
      transform: translate3d(0, 0.2em, 0);
    }
  }
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  backdrop-filter: blur(10px);
  background-color: rgba(17, 24, 39, 0.9);
}
</style>
