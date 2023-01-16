<template>
  <div class="hero f-col">
    <Brain />
    <div class="hero__content">
      <h1 class="hero__title">{{ $t('pages.index.greeting') }}</h1>
      <p class="hero__description">
        {{ $t('pages.index.time') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.hero {
  // background-color: rgba(17, 24, 39, .9);
  background: rgb(17, 24, 39);
  background: linear-gradient(
    176deg,
    rgba(17, 24, 39, 0.9528186274509804) 34%,
    rgba(14, 5, 96, 0.4009978991596639) 76%
  );
  font-size: 22px;
  color: #fffade;
  position: relative;
  height: fit-content;
  min-height: 600px;
  width: 100%;
  user-select: none;
  overflow: hidden;
  padding: 40px;
  @media (max-width: 800px) {
    font-size: 16px;
  }
  .brain,
  &__content {
    position: absolute;
  }

  .brain {
    top: 20px;
    width: 100%;
    @media (min-width: 900px) {
      max-width: 1000px;
    }
    @media (max-width: 550px) {
      width: 150%;
    }
  }
  &__title {
    margin-top: 0;
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

  &__content {
    top: 120px;
    text-align: center;
  }
}
</style>
