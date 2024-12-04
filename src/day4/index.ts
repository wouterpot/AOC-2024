import * as R from 'ramda';

export const transform = R.pipe(R.split('\n'));

export const solve1 = (words: string[]) => {
  let count = 0;
  count += countArray(words);
  const transposed = transposeArray(words);
  count += countArray(transposed);
  const diagonals = diagonalArrays(words);
  count += countArray(diagonals);
  const transposedReverse = R.map(R.reverse, transposed);
  const transposedDiagonals = diagonalArrays(transposedReverse);
  count += countArray(transposedDiagonals);
  return count;
};

export const expected1 = 2464;

export const solve2 = (words: string[]) => {
  const grid = words.map((word) => word.split(''));
  let count = 0;
  const getDiag1 = (i: number, j: number) => [
    grid[i - 1][j - 1],
    grid[i + 1][j + 1],
  ];
  const getDiag2 = (i: number, j: number) => [
    grid[i + 1][j - 1],
    grid[i - 1][j + 1],
  ];
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 0; j < grid.length - 1; j++) {
      const diag1 = getDiag1(i, j);
      const diag2 = getDiag2(i, j);
      if (
        grid[i][j] === 'A' &&
        (R.equals(diag1, ['M', 'S']) || R.equals(diag1, ['S', 'M'])) &&
        (R.equals(diag2, ['M', 'S']) || R.equals(diag2, ['S', 'M']))
      ) {
        count++;
      }
    }
  }
  return count;
};

export const expected2 = 1982;

const countArray = (lines: string[]): number => {
  let count = 0;
  lines.forEach((word) => {
    let matches = word.match(/XMAS/g) ?? [];
    count += matches.length;
    const reverse = R.reverse(word);
    matches = reverse.match(/XMAS/g) ?? [];
    count += matches.length;
  });
  return count;
};

const transposeArray = (array: string[]): string[] => {
  return array[0]
    .split('')
    .map((_, colIndex) => array.map((row) => row[colIndex]))
    .map((row) => row.join(''));
};

const diagonalArrays = (array: string[]): string[] => {
  const result = [];
  for (let i = 1; i < array.length; i++) {
    const row = [];
    for (let j = 0; j < array.length - i; j++) row.push(array[j][j + i]);
    result.push(row.join(''));
  }
  result.reverse();
  for (let i = 0; i < array.length; i++) {
    const row = [];
    for (let j = 0; j < array.length - i; j++) row.push(array[i + j][j]);
    result.push(row.join(''));
  }
  return result;
};
