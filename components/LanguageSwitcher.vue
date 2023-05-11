<template>
  <div v-click-outside="() => (isExpanded = false)" class="lang-switcher">
    <button
      class="btn lang-switcher__option lang-switcher__option--active"
      @click="isExpanded = !isExpanded"
    >
      {{ currentLang.flag }}
    </button>
    <div v-if="isExpanded" class="lang-switcher__menu">
      <button
        v-for="lang in remainingLangs"
        :key="lang.iso"
        class="btn lang-switcher__option"
        @click="changeLocale(lang.iso)"
      >
        {{ lang.flag }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales } from '~/utils/lang'

const isExpanded = ref(false)

const currentLang = computed(() => {
  return availableLocales[localeSetting.value]
})
// state
const localeSetting = useState<string>('locale.setting')

const remainingLangs = computed(() => {
  const { [localeSetting.value]: _, ...remainingLangs } = availableLocales
  return remainingLangs
})

const changeLocale = (iso: string) => {
  localeSetting.value = iso
  isExpanded.value = false
}
</script>

<style lang="scss" scoped>
.lang-switcher {
  position: relative;
  &__menu {
    position: absolute;
    // background: $white;
    top: 30px;
    border-radius: 5px;
  }

  &__option {
    display: flex;
  }
}
</style>
