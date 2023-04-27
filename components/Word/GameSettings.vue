<template>
  <div class="word-game-settings f-col">
    <div class="word-game-settings__row">
      <span class="word-game-settings__label">How many words?</span>
      <DropDown v-model="settings.listLength" :options="options" />
    </div>
    <div class="word-game-settings__row">
      <span class="word-game-settings__label">Max word length</span>
      <FormTextInput v-model="settings.wordLength" type="number" />
    </div>
    <button class="btn btn--primary" @click="startGame">Start</button>
  </div>
</template>

<script lang="ts" setup>
const options = [
  { label: '20', value: 20 },
  {
    label: '30',
    value: 30,
  },
]

const settings = ref({
  listLength: 20,
  wordLength: 8,
})
const emit = defineEmits(['input', 'start'])

const startGame = () => {
  emit('start')
}
</script>

<style lang="scss" scoped>
.word-game-settings {
  padding: 20px;
  &__row {
    width: 100%;
    display: grid;
    grid-template-columns: 5fr 1fr;
  }
}
</style>
