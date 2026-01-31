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
              <!-- <span>{{ $t('pages.games.general') }}</span> -->
              <GameGrid :games-array="getAllGames" />
            </TabPanel>

            <TabPanel v-show="currentTab === 'memory'">
              <!-- <span>{{ $t('pages.games.memory') }}</span> -->
              <GameGrid :games-array="getMemoryArray" />
            </TabPanel>

            <TabPanel v-show="currentTab === 'math'">
              <!-- <span>{{ $t('pages.games.math') }}</span> -->
              <GameGrid :games-array="getMathArray" />
            </TabPanel>
          </template>
        </TabGroup>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'

import { createGamesArray } from '@/mixins/gamesArray'

definePageMeta({
  layout: 'page',
})

// composable
const { t } = useLang()

const games = ref(createGamesArray(t))

const localeSetting = useState<string>('locale.setting')

watch(localeSetting, () => {
  games.value = createGamesArray(t)
})

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

const getAllGames = computed(() => games.value)

const getMemoryArray = computed(() =>
  games.value.filter((game) => game.type === 'memory')
)

const getMathArray = computed(() =>
  games.value.filter((game) => game.type === 'math')
)

const changeTab = (tabName: string) => {
  currentTab.value = tabName
}
</script>
