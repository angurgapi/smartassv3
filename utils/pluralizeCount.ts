export function pluralizeCount(value: number, words: string): string {
  const cases = [2, 0, 1, 1, 1, 2]
  const titles = words.split(',').slice(0, 3)

  const int = ~~value

  return titles[
    int % 100 > 4 && int % 100 < 20 ? 2 : cases[int % 10 < 5 ? int % 10 : 5]
  ]
}
