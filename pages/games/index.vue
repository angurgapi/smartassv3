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
    title: t('pages.games.memoTitle'),
    description: t('pages.games.memoDesc'),
    image: 'pairs',
    url: 'pairs',
    type: 'memory',
  },
  {
    id: 2,
    title: t('pages.games.simonTitle'),
    description: t('pages.games.simonDesc'),
    image: 'simon',
    url: 'simon',
    type: 'memory',
  },
  {
    id: 3,
    title: t('pages.games.wordTitle'),
    description: t('pages.games.wordDesc'),
    url: 'words',
    image: 'wordlist',
    type: 'memory',
  },
  {
    id: 4,
    title: t('pages.games.bubblesTitle'),
    description: t('pages.games.bubblesDesc'),
    url: 'math',
    image: 'math',
    type: 'math',
  },
  {
    id: 5,
    title: t('pages.games.patternsTitle'),
    description: t('pages.games.patternsDesc'),
    url: 'patterns',
    type: 'memory',
    image: 'patterns',
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
