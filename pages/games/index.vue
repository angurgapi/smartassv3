<template>
  <NuxtLayout>
    <div class="page">
      <div class="page__content">
        <TabGroup>
          <template #navigation>
            <TabButton
              :active="currentTab === 'general'"
              :title="$t('pages.games.general')"
              value="general"
              @click="changeTab"
            />
            <TabButton
              :active="currentTab === 'memory'"
              :title="$t('pages.games.memory')"
              value="memory"
              @click="changeTab"
            />
            <TabButton
              :active="currentTab === 'math'"
              :title="$t('pages.games.math')"
              value="math"
              @click="changeTab"
            />
          </template>

          <template #content>
            <TabPanel v-show="currentTab === 'general'">
              <span>{{ $t('pages.games.general') }}</span>
              <GameGrid :games-array="gamesArray" />
            </TabPanel>

            <TabPanel v-show="currentTab === 'memory'">
              <span>{{ $t('pages.games.memory') }}</span>
              <GameGrid :games-array="getMemoryArray" />
            </TabPanel>

            <TabPanel v-show="currentTab === 'math'">
              <span>{{ $t('pages.games.math') }}</span>
              <GameGrid :games-array="getMathArray" />
            </TabPanel>
          </template>
        </TabGroup>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { capitalize } from '~/utils/str'
import { Size } from '~/composables/useScreen'

// composable
const { t } = useLang()
const screen = useScreen()

const currentTab = ref('general')

useHead(() => ({
  title: capitalize(t('pages.games.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.games.description'),
    },
  ],
}))

const gamesArray = [
  {
    id: 1,
    title: 'Pairs',
    description: "Memorize the cards' positions and find a match for each card",
    image: 'pairs',
    url: 'pairs',
    type: 'memory',
  },
  {
    id: 2,
    title: 'Simon',
    description: 'Repeat the random sequence of light & sound signals',
    image: 'simon',
    url: 'simon',
    type: 'memory',
  },
  {
    id: 3,
    title: 'Word list',
    description: 'Reproduce as many words from the list as you remember',
    url: 'words',
    image: 'wordlist',
    type: 'memory',
  },
  {
    id: 4,
    title: 'Simple math',
    description: 'Calculate the results of elementary math expressions',
    url: 'math',
    image: 'math',
    type: 'math',
  },
  {
    id: 5,
    title: 'Patterns',
    description: 'Quickly memorize the pattern of tiles',
    url: 'patterns',
    type: 'memory',
  },
]
const getMemoryArray = computed(() =>
  gamesArray.filter((game) => game.type === 'memory')
)

const getMathArray = computed(() =>
  gamesArray.filter((game) => game.type === 'math')
)

const changeTab = (tabName: string) => {
  currentTab.value = tabName
}
</script>
