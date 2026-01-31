<template>
  <footer class="footer f-row">
    <div class="footer__left f-column">
      <span>
        {{ app.name }}
      </span>
      <span>
        © {{ getYear }}
        All rights reserved.
      </span>
    </div>
    <div class="footer__right"></div>
  </footer>
</template>

<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { computed } from 'vue'
import p from './../../package.json'

const app = useAppConfig() as AppConfigInput
const getYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  height: 80px;
  width: 100%;
  background: $gradient-blue;
  color: $primary-dark;
  padding: 20px;
  font-size: 1em;
}
</style>
