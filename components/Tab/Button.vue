<template>
  <button
    class="tab-btn"
    :class="{ 'tab-btn--active': active }"
    @click="$emit('click', value)"
  >
    {{ title }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'tab',
  },
  value: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'click', value: string): void
}>()
</script>

<style lang="scss" scoped>
.tab-btn {
  cursor: pointer;
  color: #000;
  height: 32px;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 24px;

  &:hover {
    font-weight: 600;
    opacity: 0.8;
  }
  &--active {
    // background-color: #fffade;
    opacity: 0.7;
  }
}
</style>
