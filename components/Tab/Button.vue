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
<<<<<<< HEAD
  cursor: pointer;
  color: #000;
  height: 32px;
  border: none;
  width: 100%;
  text-align: left;
  font-size: 24px;
=======
  letter-spacing: 1px;
  font-size: 0.8em;
  cursor: pointer;
  color: #000;
  height: 25px;
  border: none;
  width: 100%;
  text-align: left;
>>>>>>> origin/main

  &:hover {
    font-weight: 600;
    opacity: 0.8;
  }
  &--active {
    // background-color: #fffade;
<<<<<<< HEAD
    opacity: 0.7;
=======
    font-weight: 600;
>>>>>>> origin/main
  }
}
</style>
