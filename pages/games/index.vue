<template>
  <PageWrapper>
    <PageSection class="mb-0">
      <Alert
        type="success"
        title="We don't keep track of your progress"
        text="...so far"
        class="mb-6"
      />
    </PageSection>
    <PageHeader>
      <PageTitle :text="$t('pages.games.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <TabGroup
          as="div"
          class="flex flex-col md:flex-row md:space-x-4"
          :vertical="screen.higherThan(Size.MEDIUM)"
        >
          <TabList class="w-full md:w-1/6 flex md:flex-col rounded-lg mb-2">
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button
                :class="[
                  'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                  selected
                    ? 'font-extrabold'
                    : 'text-slate-800 dark:text-gray-400',
                ]"
              >
                {{ $t('pages.games.general') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button
                :class="[
                  'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                  selected
                    ? 'font-extrabold'
                    : 'text-slate-800 dark:text-gray-400',
                ]"
              >
                {{ $t('pages.games.memory') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button
                :class="[
                  'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                  selected
                    ? 'font-extrabold'
                    : 'text-slate-800 dark:text-gray-400',
                ]"
              >
                {{ $t('pages.games.math') }}
              </button>
            </HeadlessUiTab>
          </TabList>

          <!-- tabs content -->
          <TabPanels class="flex-1">
            <!-- general tab -->
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle :text="$t('pages.games.general')" />
                  <GamesGrid :games-array="gamesArray" />
                </CardContent>
              </Card>
            </TabPanel>
            <!-- memory tab -->
            <TabPanel>
              <Card
                :class="{
                  'mb-4': true,
                }"
              >
                <CardContent>
                  <CardTitle
                    class="capitalize"
                    :text="$t('pages.games.memory')"
                  />
                  <GamesGrid :games-array="getMemoryArray" />
                </CardContent>
              </Card>
            </TabPanel>
            <!-- math tab -->
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle
                    class="capitalize"
                    :text="$t('pages.games.math')"
                  />
                  <GamesGrid :games-array="getMathArray" />
                </CardContent>
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {
  TabGroup,
  TabList,
  Tab as HeadlessUiTab,
  TabPanels,
  TabPanel,
} from '@headlessui/vue'
import { computed } from 'vue'
import { capitalize } from '~/utils/str'
import { Size } from '~/composables/useScreen'

// composable
const { t } = useLang()
const screen = useScreen()

// compiler macro
definePageMeta({
  layout: 'page',
})
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
    url: 'wordlist',
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
]
const getMemoryArray = computed(() =>
  gamesArray.filter((game) => game.type === 'memory')
)

const getMathArray = computed(() =>
  gamesArray.filter((game) => game.type === 'math')
)
</script>
