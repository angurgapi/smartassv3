export const useSticky = (el: HTMLElement, offset: number) => {
  const onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (window.pageYOffset >= 100) {
      el.classList.add('sticky')
    } else {
      el.classList.remove('sticky')
    }
  }

  window.addEventListener('scroll', onScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    onScroll,
  }
}
