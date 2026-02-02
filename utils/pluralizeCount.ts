export function pluralizeCount(value: number, words: string): string {
  const cases = [2, 0, 1, 1, 1, 2]
  const titles = words.split(',').map((s) => s.trim())

  const int = Math.trunc(value)

  const idx =
    int % 100 > 4 && int % 100 < 20 ? 2 : cases[int % 10 < 5 ? int % 10 : 5]

  if (titles.length === 2) {
    return int === 1 ? titles[0] : titles[1]
  }

  return titles[idx] ?? titles[titles.length - 1] ?? ''
}
