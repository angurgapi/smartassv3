<template>
  <div class="bar">test bar</div>
  <span>{{ count }}</span>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const count = inject('count')
</script>
