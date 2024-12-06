import * as R from 'ramda';

export const transform = R.pipe(R.split('\n'), R.map(R.split('')));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const findCaret = (grid: string[][]): number[] => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === '^') return [x, y];
    }
  }
  return undefined;
};

const countX = (grid: string[][]): number => {
  let count = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 'X') count++;
    }
  }
  return count;
};

const gridToString = (grid: string[][]): string => {
  return grid.map((row) => row.join('')).join('\n');
};

export const solve1 = (grid: string[][]) => {
  let pos = findCaret(grid);
  let direction = directions[0];
  while (
    pos[0] >= 0 &&
    pos[0] < grid.length &&
    pos[1] >= 0 &&
    pos[1] < grid[0].length
  ) {
    let nextPos = [pos[0] + direction[0], pos[1] + direction[1]];
    if (grid[nextPos[0]]?.[nextPos[1]] === '#') {
      // turn right
      direction = directions[(directions.indexOf(direction) + 1) % 4];
      nextPos = [pos[0] + direction[0], pos[1] + direction[1]];
    }
    if (grid[pos[0]]?.[pos[1]]) grid[pos[0]][pos[1]] = 'X';
    pos = nextPos;
  }
  return countX(grid);
};

export const expected1 = 5269;

// export const solve2 = (content: string[]) => {};

export const expected2 = null;
