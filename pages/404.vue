<template>
  <NuxtLayout>
    <Error :code="404" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'Page Not Found',
}))
</script>
