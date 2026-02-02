import { ref, Ref, watch } from 'vue'
import { GameData } from '~~/types/GameData'

export function createGamesArray() {
  return [
    {
      id: 1,
      title: 'Memory Pairs',
      description: 'Find matching pairs of cards',
      image: 'pairs',
      url: 'pairs',
      type: 'memory',
    },
    {
      id: 2,
      title: 'Simon',
      description: 'Repeat the sequence of colors',
      image: 'simon',
      url: 'simon',
      type: 'memory',
    },
    {
      id: 3,
      title: 'Word List',
      description: 'Remember and type words from a list',
      url: 'words',
      image: 'wordlist',
      type: 'memory',
    },
    {
      id: 4,
      title: 'Quick Math',
      description: 'Solve simple math equations',
      url: 'math',
      image: 'math',
      type: 'math',
    },
    {
      id: 5,
      title: 'Pattern Match',
      description: 'Remember and recreate patterns',
      url: 'patterns',
      type: 'memory',
      image: 'patterns',
    },
  ]
}
