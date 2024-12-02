import * as R from 'ramda';

export const transform = R.pipe(
  R.split('\n'),
  R.map(R.split(/\s+/)),
  R.map(R.map(parseInt)),
);

export const solve1 = (numbers: number[][]) => {
  let safe = 0;
  numbers.forEach((row) => {
    // Check whether the row is scriptly decreasing
    const descending = row.reduce((acc, n) =>
      n < acc && n >= acc - 3 ? n : NaN,
    );
    if (descending) return safe++;
    const ascending = row.reduce((acc, n) =>
      n > acc && n <= acc + 3 ? n : NaN,
    );
    if (ascending) return safe++;
  });
  return safe;
};

export const expected1 = 516;

export const solve2 = (numbers: number[][]) => {
  let safe = 0;
  numbers.forEach((row) => {
    // Check whether the row is scriptly decreasing
    const descending = row.reduce((acc, n) =>
      n < acc && n >= acc - 3 ? n : NaN,
    );
    if (descending) return safe++;
    const ascending = row.reduce((acc, n) =>
      n > acc && n <= acc + 3 ? n : NaN,
    );
    if (ascending) return safe++;
  });
  return safe;
};

export const expected2 = null;
