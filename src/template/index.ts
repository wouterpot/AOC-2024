import * as R from 'ramda';

export const transform = R.pipe(R.split('\n'), R.map(R.identity()));

export const solve1 = (lines: string[]) => {};

export const expected1 = null;

export const solve2 = (content: string[]) => {};

export const expected2 = null;
