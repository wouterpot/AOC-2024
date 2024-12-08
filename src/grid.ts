export class Grid2D<T> {
  constructor(private grid: T[][]) {}

  coord(pos: Pos) {
    return this.grid[pos[0]]?.[pos[1]];
  }

  set(pos: Pos, value: T) {
    if (!this.isInside(pos)) return;
    this.grid[pos[0]][pos[1]] = value;
  }

  isInside(pos: Pos) {
    return (
      pos[0] >= 0 &&
      pos[0] < this.grid.length &&
      pos[1] >= 0 &&
      pos[1] < this.grid[0].length
    );
  }

  findAll(expr: (string) => boolean): Pos[] {
    const found: Pos[] = [];
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (expr(this.grid[x][y])) found.push([x, y]);
      }
    }
    return found;
  }

  positionsToString = (set: Set<string>, symbol: T): string => {
    const copy = this.grid.map((row) => [...row]);
    set.forEach((pos) => {
      const [x, y] = pos.split(',').map(Number);
      copy[x][y] = copy[x][y] === '.' ? symbol : copy[x][y];
    });
    return copy.map((row) => row.join('')).join('\n');
  };

  countSymbol = (symbol: T): number => {
    let count = 0;
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (this.grid[x][y] === symbol) count++;
      }
    }
    return count;
  };

  copy = (): Grid2D<T> => {
    return new Grid2D(this.grid.map((row) => [...row]));
  };

  toString = (): string => {
    return this.grid.map((row) => row.join('')).join('\n');
  };
}

export type Pos = [number, number];
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

export const fromString = (str: string): Pos => {
  const [x, y] = str.split(',').map(Number);
  return [x, y];
};

export const directions: Pos[] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export const dirToString = (dir: Pos): string => {
  if (equals(dir, directions[0])) return '^';
  if (equals(dir, directions[1])) return '>';
  if (equals(dir, directions[2])) return 'v';
  if (equals(dir, directions[3])) return '<';
  return ' ';
};
