import * as R from 'ramda';

export const transform = R.pipe(
  R.split('\n'),
  R.filter(Boolean),
  R.map(R.split(':')),
  R.map(([a, b]) => [parseInt(a), b.trim().split(' ').map(Number)]),
);

const calcResult = (numbers: number[], results: number[] = []): number[] => {
  if (numbers.length === 1) return [numbers[0]];
  const rest = numbers.slice(1);
  return [
    ...calcResult(rest, results).map((r) => numbers[0] * r),
    ...calcResult(rest, results).map((r) => numbers[0] + r),
  ];
};

export const solve1 = (lines: [number, number[]][]) => {
  const outcomes = lines.map(([result, numbers]) => {
    const outcomes = calcResult(R.reverse(numbers));
    return outcomes.includes(result) ? result : 0;
  });
  return R.sum(outcomes);
};

export const expected1 = 6392012777720;

const calcResult2 = (numbers: number[], results: number[] = []): number[] => {
  if (numbers.length === 1) return [numbers[0]];
  const rest = numbers.slice(1);
  return [
    ...calcResult2(rest, results).map((r) => numbers[0] * r),
    ...calcResult2(rest, results).map((r) => numbers[0] + r),
    ...calcResult2(rest, results).map((r) => Number(`${r}${numbers[0]}`)),
  ];
};

export const solve2 = (lines: [number, number[]][]) => {
  const outcomes = lines.map(([result, numbers]) => {
    const outcomes = calcResult2(R.reverse(numbers));
    return outcomes.includes(result) ? result : 0;
  });
  return R.sum(outcomes);
};

export const expected2 = 61561126043536;
