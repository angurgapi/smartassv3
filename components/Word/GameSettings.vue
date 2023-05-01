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
  {
    label: '10',
    value: 10,
  },
  { label: '20', value: 20 },
  {
    label: '30',
    value: 30,
  },
]

const settings = reactive({
  listLength: 10,
  wordLength: 8,
})
const emit = defineEmits(['input', 'start'])

const startGame = () => {
  if (settings.listLength < 4) {
    settings.listLength = 4
  }
  emit('start', settings)
}
</script>

<style lang="scss" scoped>
.word-game-settings {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  &__row {
    width: 100%;
    display: grid;
    grid-gap: 20px;
    align-items: center;
    grid-template-columns: calc(100% - 90px) 70px;
    &:not(:first-child) {
      margin-top: 20px;
    }
    // @media (max-width: 400px) {
    //   grid-template-columns: 1fr;
    // }
  }
  &::v-deep .text-input-container__input {
    width: 100%;
    font-size: 0.8em;
    padding: 6px 12px;
  }
  &::v-deep .dropdown {
    width: 100%;
  }

  &::v-deep .btn--primary {
    height: 56px;
    width: 100px;
    margin-top: 20px;
  }
}
</style>
