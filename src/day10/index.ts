import * as R from 'ramda';
import { Grid, Grid2D, Pos } from '../grid';

export const transform = R.pipe(
  R.split('\n'),
  R.map(
    R.pipe(
      R.split(''),
      R.map((e) => (isNaN(e) ? '.' : Number(e))),
    ),
  ),
);

const findTrailHeadRecursive = (
  grid: Grid2D<number>,
  start: Pos,
  path = new Set<string>(),
): string[][] => {
  if (!grid.isInside(start)) return [];
  const [x, y] = start;
  const val = grid.coord([x, y]);
  if (val !== path.size) return [];
  path.add(`${x},${y}`);
  if (val === 9 && path.size === 10) {
    return [[...path]];
  }
  const neighbors: Pos[] = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  const filtered = neighbors
    .filter((pos: Pos) => grid.isInside(pos))
    .filter((pos: Pos) => !path.has(`${pos[0]},${pos[1]}`));
  const result = filtered
    .map((pos) => findTrailHeadRecursive(grid, pos, new Set<string>(path)))
    .flat();
  return result;
};

export const solve11 = (rawGrid: Grid<number>) => {
  const grid = new Grid2D(rawGrid);
  let sum = 0;
  for (let i = 0; i < grid.height; i++) {
    for (let j = 0; j < grid.width; j++) {
      const result = findTrailHeadRecursive(grid, [i, j]);
      const paths = result.map((trail) => trail[trail.length - 1]);
      if (paths.length === 0) continue;
      sum += R.uniq(paths).length;
    }
  }
  return sum;
};
export const expected1 = 489;

export const solve2 = (rawGrid: Grid<number>) => {
  const grid = new Grid2D(rawGrid);
  let sum = 0;
  for (let i = 0; i < grid.height; i++) {
    for (let j = 0; j < grid.width; j++) {
      const result = findTrailHeadRecursive(grid, [i, j]);
      if (result.length === 0) continue;
      sum += result.length;
    }
  }
  return sum;
};
export const expected2 = 1086;
