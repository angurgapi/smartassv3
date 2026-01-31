<template>
  <section class="landing-section bg-light text-dark">
    <div class="landing-section__inner f-col">
      <h2 class="landing-section__title">
        {{ $t('index.reason_block.title') }}
      </h2>
      <div class="reason-list f-col">
        <IndexReasonCard
          v-for="(reason, index) in reasons"
          :key="index"
          :icon="reason.icon"
          :content="$t(`index.reason_block.${reason.title}`)"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// vars
const reasons = [
  {
    icon: 'memory',
    title: 'memory',
  },
  {
    icon: 'anxiety',
    title: 'anxiety',
  },
  {
    icon: 'decision',
    title: 'decision',
  },
  {
    icon: 'brain',
    title: 'brain',
  },
  {
    icon: 'networking',
    title: 'networking',
  },
]

const root = ref('')

const observeItems = () => {
  const targets = document.querySelectorAll('.reason-card')
  const options = {
    threshold: 0.3,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden')
      }
      //   else {
      //     this.isInvisible = true
      //   }
    })
  }, options)

  targets.forEach((target) => {
    observer.observe(target)
  })
}

onMounted(() => {
  observeItems()
})
</script>

<style lang="scss" scoped>
.reason-list {
  width: fit-content;
  max-width: 100%;
}
</style>
