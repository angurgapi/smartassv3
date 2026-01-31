<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    type="button"
    class="inline-flex h-[46px] items-center justify-center rounded-full border border-slate-200 bg-slate-200 px-5 py-2 text-sm font-medium text-slate-900 shadow-sm transition active:scale-[0.98] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
  >
    <span class="text-sm leading-none">{{ $t('buttons.restartBtn') }}</span>
  </button>
</template>
