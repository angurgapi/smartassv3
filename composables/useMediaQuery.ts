import { useMediaQuery } from '@vueuse/core'
import type { Ref } from 'vue'
export function useResponsiveMediaQuery() {
  const isMobileScreen: Ref<boolean> = useMediaQuery('(max-width: 767.99px)')
  return {
    isMobileScreen,
  }
}
