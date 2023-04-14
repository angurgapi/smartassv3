<template>
  <div class="card">
    <TestBar v-for="n of 5" :key="n" />
  </div>
</template>

<script lang="ts" setup>
// onMounted(() => {
//   debugger

//     console.log('log from card')

// })
</script>
