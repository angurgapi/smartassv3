<template>
  <div ref="navbar" class="navbar">
    <nuxt-link class="navbar__link f-row" to="/">
      <SvgIcon class="navbar__icon dark:navbar__icon--white" name="brain" />
      smartass</nuxt-link
    >
    <div class="menu f-row">
      <nuxt-link class="navbar__link" to="/games">games</nuxt-link>
      <LanguageSwitcher />
      <!-- <ThemeSwitcher /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
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
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  &__icon {
    margin-right: 10px;
    svg {
      fill: #fff;
      height: 22px;
      width: 22px;
    }
  }

  &__link {
    font-size: 22px;
    color: #fff;
    letter-spacing: 0.6px;
    margin-right: 20px;
    position: relative;
    padding: 0.2em 0;
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
  z-index: 200;
  background-color: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(10px);
}
</style>
