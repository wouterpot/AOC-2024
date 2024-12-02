import * as R from 'ramda';

export const transform = R.pipe(
  R.split('\n'),
  R.filter((l) => l.length > 0),
  R.map(R.split(/\s+/)),
  R.map(R.map(parseInt)),

  // transpose matrix
  R.reduce((acc, row) => row.map((_, i) => [...(acc[i] || []), row[i]]), []),
);

export const solve1 = (leftAndRight: number[][]) => {
  let [left, right] = leftAndRight;

  // Pick smallest number from left and largest number from right
  left = left.sort((a, b) => a - b);
  right = right.sort((a, b) => a - b);
  const diffs = left.map((l, i) => l - right[i]);
  return diffs.reduce((acc, diff) => acc + Math.abs(diff), 0);
};

export const expected1 = 765748;

export const solve2 = (leftAndRight: number[][]) => {
  const [left, right] = leftAndRight;

  // Count for each instance of left how often it appears in right
  const counts = left.map((l) => right.filter((r) => r === l).length * l);
  return R.sum(counts);
};

export const expected2 = 27732508;
