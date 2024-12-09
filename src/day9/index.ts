import * as R from 'ramda';

export const transform = R.pipe(R.split(''), R.map(Number));

export const solve1 = (lines: number[][]) => {
  console.log(lines);
};

export const expected1 = null;

export const solve2 = (content: string[]) => {};

export const expected2 = null;
