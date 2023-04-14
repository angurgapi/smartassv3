<template>
  <div class="hero f-col">
    <div class="hero__content f-col">
      <client-only>
        <Brain />
      </client-only>
      <div class="hero__text">
        <h1 class="hero__title">{{ $t('pages.index.greeting') }}</h1>
        <p class="hero__description" v-html="$t('pages.index.time')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.hero {
  font-size: 22px;
  color: #fffade;
  justify-content: center;
  user-select: none;
  overflow: hidden;
  padding: 40px;
  @media (max-width: 800px) {
    font-size: 16px;
  }

  &__content {
    position: relative;
    width: 100%;
  }

  &__text {
    position: absolute;
    text-align: center;
  }

  .brain {
    width: 100%;
    @media (max-width: 550px) {
      width: 150%;
    }
  }
  &__title {
    margin: 0;
    font-size: 3.4em;
  }

  &__description {
    font-size: 2.4em;
  }
  .brain {
    top: 20px;
    @media (max-width: 800px) {
      width: 400%;
    }
  }
}
</style>
