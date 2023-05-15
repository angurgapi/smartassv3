import { ref, Ref, watch } from 'vue'
import { GameData } from '~~/types/GameData'

export function createGamesArray(t: any) {
  return [
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
}
