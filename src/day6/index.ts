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

let traversedGrid;

export const solve1 = (grid: string[][]) => {
  let pos = findCaret(grid);
  console.log(pos);
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
  traversedGrid = grid;
  console.log(gridToString(grid));
  return countX(grid);
};

export const expected1 = 5269;

const findAllHashes = (grid: string[][]): number[][] => {
  const hashes = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === '#') hashes.push([x, y]);
    }
  }
  return hashes;
};

const dirs = {
  up: [-1, 0],
  right: [0, 1],
  left: [0, -1],
  down: [1, 0],
};

const findNearestHash = (
  pos: number[],
  grid: string[][],
  dir: number[],
): number[] => {
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  while (
    nextPos[0] >= 0 &&
    nextPos[0] < grid.length &&
    nextPos[1] >= 0 &&
    nextPos[1] < grid[0].length
  ) {
    if (grid[nextPos[0]]?.[nextPos[1]] === '#') return nextPos;
    nextPos = [nextPos[0] + dir[0], nextPos[1] + dir[1]];
  }
  return undefined;
};

export const solve2 = (grid: string[][]) => {
  // const grid = traversedGrid;
  const hashes = findAllHashes(grid);
  const visited = new Set<string>();

  const addToVisited = (x: number, y: number) => {
    if (x >= 0 && y >= 0 && x < grid.length && y < grid[0].length)
      visited.add(`${x},${y}`);
  };

  hashes.forEach((hash) => {
    const [i, j] = hash;
    const upHash = findNearestHash([i, j + 1], grid, dirs.up);
    const rightHash = findNearestHash([i + 1, j], grid, dirs.right);
    const leftHash = findNearestHash([i - 1, j], grid, dirs.left);
    const downHash = findNearestHash([i, j - 1], grid, dirs.down);
    if (upHash && rightHash) addToVisited(upHash[0] + 1, rightHash[1] + 1);
    if (upHash && leftHash) addToVisited(leftHash[0] - 1, upHash[1] + 1);
    if (downHash && rightHash) addToVisited(downHash[0] + 1, rightHash[1] - 1);
    if (downHash && leftHash) addToVisited(downHash[0] - 1, leftHash[1] - 1);
  });
  console.log(visited);
  return visited.size;
};

export const expected2 = 140;
