<template>
  <NuxtLayout>
    <div class="page">
      <div class="page__content">
        <h1 class="page__title">Word list</h1>
        <p class="page__description">
          Memorize as many words from the list as possible
        </p>
        <WordGame />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>
