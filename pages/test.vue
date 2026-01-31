<!-- eslint-disable no-eval -->
<template>
  <NuxtLayout>
    <div>
      kek
      <p>{{ testVal }}</p>
      <span>{{ count }}</span>
      <!-- <button @click="callFunction">call</button> -->
      <div class="scquare-string">
        <div
          v-for="(row, idx) in stringMatrix"
          :key="idx"
          class="square-string__row"
        >
          <span
            v-for="(letter, index) in row"
            :key="index"
            class="square-string__letter"
            >{{ letter }}</span
          >
        </div>
      </div>
      <!-- <div class="glass-container">
        <img
          src="https://news.artnet.com/app/news-upload/2019/12/maurizio-cattelan-banana.jpg"
        />
        <div class="glass">
          <div v-for="number in 400" :key="number" class="glass__tile" />
        </div>
      </div> -->
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
const testVal = 'kek'

const count = ref(0)
provide('count', count)

const testStr = "I.was.going.fishing.that.morning.at.ten.o'clock"
console.log(testStr.length)

const squareString = 'abcd\nefgh\nijkl\nmnop'
const stringMatrix = squareString.split('\n')
const squareSize = stringMatrix.length
</script>

<style lang="scss" scoped>
.glass-container {
  position: relative;
  height: 400px;
  width: 400px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.glass {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-gap: 0;
  width: fit-content;
  margin: auto;
  background: #000;
  opacity: 0.3;
  &__tile {
    height: 20px;
    width: 20px;
    background: rgba(178, 208, 231, 0.18);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.9px);
    -webkit-backdrop-filter: blur(11.9px);
    &:nth-child(3n + 1) {
      background: rgba(178, 208, 231, 0.46);
      backdrop-filter: blur(27.9px);
    }
    &:nth-child(2n) {
      background: rgba(178, 208, 231, 0.26);
      backdrop-filter: blur(17.9px);
    }
  }
}

.square-string {
  &__row {
    display: grid;
    width: fit-content;
    grid-template-columns: repeat(4, 1fr);
  }

  &__letter {
    width: 22px;
    height: 22px;
    background: $white;
    border: 1px solid black;
    text-align: center;
  }
}
</style>
