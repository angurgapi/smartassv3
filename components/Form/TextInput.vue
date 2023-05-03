<template>
  <div class="text-input-container f-row">
    <div v-if="slots.prefix" class="text-input-container__prefix">
      <slot name="prefix" />
    </div>

    <input
      v-model="modelValue"
      class="text-input-container__input"
      type="text"
      :placeholder="placeholder"
      @input="onInput"
    />

    <div v-if="slots.suffix" class="text-input-container__suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// compiler macro
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'number'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()

const modelValue = ref(props.modelValue)

watch(modelValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    modelValue.value = newValue
  }
)

function onInput(event: Event) {
  let sanitizedValue: string | number = (event.target as HTMLInputElement).value
  if (props.type === 'number') {
    sanitizedValue = parseInt(sanitizedValue.replace(/\D/g, '')) || 0
  }
  modelValue.value = sanitizedValue
}
</script>

<style lang="scss" scoped>
.text-input-container {
  position: relative;
  border-radius: 5px;
  background: $white;
  border: 1px solid $gray;
  height: 42px;
  &:hover,
  &:focus {
    border: 1px solid $primary-dark;
  }

  &__preffix,
  &__suffix {
    position: absolute;
  }
  &__input {
    // height: 36px;
    padding: 5px;
    border: none;
    background: none;
    &:hover,
    &:focus {
      outline: none;
    }
  }
}
</style>
