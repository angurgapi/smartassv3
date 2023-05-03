<template>
  <div
    v-click-outside="
      () => {
        isOpen = false
      }
    "
    class="dropdown"
  >
    <button
      class="dropdown__button"
      :class="{ 'dropdown__button--rotate': isOpen }"
      @click="isOpen = !isOpen"
    >
      <span class="dropdown__label">{{ label }}</span>
      <SvgIcon
        name="chevron-down"
        class="dropdown__arrow"
        :class="{ 'dropdown__arrow--rotated': isOpen }"
      />
    </button>

    <div v-show="isOpen" class="dropdown__content">
      <ul class="dropdown__list">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="dropdown__option f-row"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
const props = defineProps({
  options: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
    default: () => [],
  },
})

const emit = defineEmits(['input', 'update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref(props.options[0])

// get label(): string {
//   return this.selectedOption.label || 'label'
// }
const label = computed(() => {
  return selectedOption.value.label || 'label'
})

const selectOption = (option: any) => {
  selectedOption.value = option
  emit('update:modelValue', selectedOption.value.value)
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  font-weight: 400;
  display: flex;
  align-items: center;
  width: fit-content;

  &__button,
  &__content {
    font-size: 0.8em;
    background: #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }

  &__button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 6px 12px 6px 12px;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  &__arrow {
    fill: #000;
    transition: 0.4s all ease-in-out;
    height: 16px;
    width: 16px;
    &--rotated {
      transform: rotate(180deg);
    }
  }

  &__label {
    margin-right: 8px;
    white-space: nowrap;
    overflow: hidden;
  }

  &__content {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 20;
    top: 50px;
    padding: 0;
    width: 100%;
    border-radius: 5px;
  }

  &__list {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  &__option {
    cursor: pointer;
    width: 100%;
    opacity: 0.8;
    padding: 6px;
    &:not(:first-child) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
