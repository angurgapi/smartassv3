<template>
  <div class="wrapper">
    <div class="wrapper__banner">
      <NavBar />
      <IndexHero />
    </div>
    <slot />

    <!-- <div class="wrapper__content">
  
      </div> -->
    <slot name="footer">
      <Footer />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper__banner {
  background-image: linear-gradient(
    to right,
    #12002e,
    #120130,
    #120131,
    #110233,
    #110335,
    #170d3f,
    #1f134a,
    #281a55,
    #3b296d,
    #4f3a85,
    #634a9f,
    #785cb9
  );
}
</style>
