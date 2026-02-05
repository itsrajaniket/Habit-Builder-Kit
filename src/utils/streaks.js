export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const sorted = [...dates].sort((a, b) => new Date(a) - new Date(b));

  let current = 1;
  let max = 1;

  for (let i = 1; i < sorted.length; i++) {
    const diff =
      (new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 1;
    }
  }

  return max;
}
