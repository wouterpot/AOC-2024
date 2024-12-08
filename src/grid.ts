// export class Grid<T> {
//   constructor(private grid: T[][]) {}

//   coord(i: number, j: number) {
//     return this.grid[i][j];
//   }
// }

type Pos = [number, number];
export type Grid<T> = T[][];

export const add = (pos1: Pos, pos2: Pos): Pos => {
  return [pos1[0] + pos2[0], pos1[1] + pos2[1]];
};

export const sub = (pos1: Pos, pos2: Pos): Pos => {
  return [pos1[0] - pos2[0], pos1[1] - pos2[1]];
};

export const equals = (pos1: Pos, pos2: Pos): boolean => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

export const isInside = (grid: string[][], pos: Pos): boolean => {
  return grid[pos[0]] && grid[pos[0]][pos[1]] !== undefined;
};

export const findAll = (grid: string[][], expr: (string) => boolean): Pos[] => {
  const hashes: Pos[] = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (expr(grid[x][y])) hashes.push([x, y]);
    }
  }
  return hashes;
};

export const positionsToSting = (
  set: Set<string>,
  symbol: string,
  grid: Grid<string>,
): string => {
  set.forEach((pos) => {
    const [x, y] = pos.split(',').map(Number);
    grid[x][y] = grid[x][y] === '.' ? symbol : grid[x][y];
  });
  return grid.map((row) => row.join('')).join('\n');
};
