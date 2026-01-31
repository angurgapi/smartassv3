<script lang="ts" setup>
const props = defineProps({
  stage: {
    type: Number,
    default: 2,
  },
})

const isFooterVisible = computed(() => {
  return props.stage > 1
})
</script>
<template>
  <div
    class="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 shadow-xl backdrop-blur flex items-center justify-center gap-2 p-4"
  >
    <div class="w-full flex items-center justify-center gap-2">
      <slot />
    </div>
  </div>
</template>
