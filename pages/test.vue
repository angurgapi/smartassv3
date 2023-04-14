<template>
  <div>
    kek
    <p>{{ testVal }}</p>
    <span>{{ count }}</span>
    <button @click="count++">++</button>

    <TestList />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
const testVal = 'kek'

const count = ref(0)
provide('count', count)
</script>
