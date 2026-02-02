<script setup lang="ts">
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="inline-flex h-[46px] items-center justify-center rounded-full border border-slate-200 bg-slate-200 px-5 py-2 text-sm font-medium text-slate-900 shadow-sm transition active:scale-[0.98] hover:bg-slate-50"
    @click="$emit('click')"
  >
    <span class="text-sm leading-none">{{ $t('buttons.restartBtn') }}</span>
  </button>
</template>
