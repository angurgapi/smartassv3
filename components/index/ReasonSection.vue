<template>
  <section class="landing-section bg-light text-dark">
    <div class="landing-section__inner f-col">
      <h2 class="landing-section__title">Why even bother?</h2>
      <ReasonCard
        v-for="(reason, index) in reasons"
        :key="index"
        :card="reason"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import ReasonCard from './ReasonCard.vue'
// vars
const reasons = [
  {
    icon: 'memory',
    content:
      'Do you often catch yourself <span class="highlighted">forgetting things</span>?<br/><span class="details">Memory training is the best pill there is.</span>',
  },
  {
    icon: 'anxiety',
    content:
      '<span class="highlighted">Fight anxiety</span><br/><span class="details">A fit mind is more likely to win over desctructive thoughts.</span>',
  },
  {
    icon: 'decision',
    content:
      'Faster <span class="highlighted">decision-making</span><br/><span class="details">Navigate through life and perform better as a professional.</span>',
  },
  {
    icon: 'brain',
    content:
      'Build more <span class="highlighted">neural pathways</span><br/><span class="details">Reduce the risk of dementia, make your future easier.</span>',
  },
  {
    icon: 'networking',
    content:
      'Improve <span class="highlighted">communication</span><br/><span class="details">Interact with people more efficiently having a well-focused mind.</span>',
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
