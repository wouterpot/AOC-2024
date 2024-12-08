import * as R from 'ramda';
import { add, directions, dirToString, Grid, Grid2D, Pos } from '../grid';

export const transform = R.pipe(
  R.split('\n'),
  R.filter(Boolean),
  R.map(R.split('')),
);

export const solve1 = (rawGrid: Grid<string>) => {
  const grid = new Grid2D(rawGrid);
  const pos = grid.findAll((s) => s === '^')[0];
  const direction = directions[0];
  const traversedPath = new Set<string>();
  const action = (pos) => {
    if (grid.coord(pos)) {
      grid.set(pos, 'X');
      traversedPath.add(`${pos[0]},${pos[1]}`);
    }
  };
  traverseGrid(grid, pos, direction, action);
  return grid.countSymbol('X');
};

export const expected1 = 5269;

export const solve2 = (rawGrid: Grid<string>) => {
  const grid = new Grid2D(rawGrid);
  const startPos = grid.findAll((s) => s === '^')[0];
  const direction = directions[0];
  const possiblePos = new Set<string>();
  const guardPath = new Set<string>();
  const action = (pos, dir) => {
    const nextPos = add(pos, dir);
    guardPath.add(`${pos[0]},${pos[1]}`);
    if (grid.coord(nextPos) === '#') return;
    if (guardPath.has(`${nextPos[0]},${nextPos[1]}`)) return;
    grid.set(nextPos, '#');

    const traversedPath = new Set<string>();
    const findCycle = (pos2, dir2) => {
      const cycle = traversedPath.has(
        `${pos2[0]},${pos2[1]},${dirToString(dir2)}`,
      );
      if (cycle) {
        possiblePos.add(`${nextPos[0]},${nextPos[1]}`);
        // console.log(grid.positionsToString(traversedPath, 'X'));
      }
      traversedPath.add(`${pos2[0]},${pos2[1]},${dirToString(dir2)}`);
      return !cycle;
    };
    traverseGrid(grid, pos, dir, findCycle);
    grid.set(nextPos, '.');
  };
  traverseGrid(grid, startPos, direction, action);
  possiblePos.delete(`${startPos[0]},${startPos[1]}`);
  // console.log([...possiblePos].join(';'));
  console.log(grid.positionsToString(possiblePos, '0'));
  return possiblePos.size;
};

// 140: too low
// 1992: too high
// 1905: wrong
// 1583: too high (pottootje)

export const expected2 = 140;

function traverseGrid(
  grid: Grid2D<string>,
  pos: Pos,
  direction: Pos,
  action: (pos: Pos, dir: Pos) => boolean | void,
) {
  while (grid.isInside(pos)) {
    let nextPos = add(pos, direction);
    if (grid.coord(nextPos) === '#') {
      // turn right
      direction = directions[(directions.indexOf(direction) + 1) % 4];
      nextPos = add(pos, direction);
    }
    const cont = action(pos, direction);
    if (cont === false) break;
    pos = nextPos;
  }
}
