import * as R from 'ramda';

export const transform = R.pipe(
  R.split('\n'),
  R.filter((l) => l.length > 0),
  R.map(R.split(/\s+/)),
  R.map(R.map(parseInt)),
);

const checkIsSafe = (row: number[]) => {
  const descending = row.reduce((acc, n) =>
    n < acc && n >= acc - 3 ? n : NaN,
  );
  if (descending) return true;
  const ascending = row.reduce((acc, n) => (n > acc && n <= acc + 3 ? n : NaN));
  if (ascending) return true;
  return false;
};

export const solve1 = (numbers: number[][]) => {
  let safe = 0;
  numbers.forEach((row) => {
    const isSafe = checkIsSafe(row);
    if (isSafe) safe++;
  });
  return safe;
};

export const expected1 = 516;

export const solve2 = (numbers: number[][]) => {
  let safe = 0;
  numbers.forEach((row) => {
    const isSafe = checkIsSafe(row);
    if (isSafe) return safe++;
    for (let i = 0; i < row.length; i++) {
      // remove element at i from row
      const withoutI = row.filter((_, j) => j !== i);
      const isSafe = checkIsSafe(withoutI);
      if (isSafe) return safe++;
    }
  });
  return safe;
};

export const expected2 = 561;
