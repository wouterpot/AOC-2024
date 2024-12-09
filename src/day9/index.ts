import * as R from 'ramda';

export const transform = R.pipe((s) => s.trim(), R.split(''), R.map(Number));

const isEven = (n: number) => n % 2 === 0;

export const solve11 = (line: number[]) => {
  const result = [];
  let end = line.length - 1;
  end = isEven(end) ? end : end - 1;
  let i = 0;
  while (i <= end) {
    if (isEven(i)) {
      const blocks = line[i];
      result.push(...R.repeat(i / 2, blocks));
      i++;
    } else {
      const whites = line[i];
      const blocks = line[end];
      const blocksToTake = Math.min(whites, blocks);
      result.push(...R.repeat(end / 2, blocksToTake));
      line[i] -= blocksToTake;
      line[end] -= blocksToTake;
      if (line[i] === 0) i++;
      if (line[end] === 0) end -= 2;
    }
  }
  return result.reduce((acc, id, index) => acc + id * index, 0);
};

export const expected1 = 6370402949053;

export const solve2 = (line: number[]) => {
  let end = line.length - 1;
  end = isEven(end) ? end : end - 1;
  let i = 0;
  const diskSize = R.sum(line);
  let beginCursor = 0;
  let endCursor = diskSize - 1;
  const result = R.repeat('.', diskSize);

  function insertBlocksAt(
    insertAt: number,
    elem: number | string,
    count: number,
  ) {
    for (let j = insertAt; j < count + insertAt; j++) result[j] = elem;
    return count;
  }

  while (i <= end) {
    if (isEven(i)) {
      const blocks = line[i];
      beginCursor += insertBlocksAt(beginCursor, i / 2, blocks);
      i++;
    } else {
      if (line[end + 1]) endCursor -= line[end + 1];
      const whites = line[i];
      const blocks = line[end];
      if (whites >= blocks) {
        beginCursor += insertBlocksAt(beginCursor, end / 2, blocks);
        beginCursor += insertBlocksAt(beginCursor, '.', whites - blocks);
      } else {
        beginCursor += insertBlocksAt(beginCursor, '.', whites);
        endCursor -= insertBlocksAt(endCursor, end / 2, blocks);
      }
      // endCursor -= blocks;
      // beginCursor += whites;
      end -= 2;
      i++;
    }
  }
  console.log(result.join(''));
  return result.reduce(
    (acc, id, index) => acc + (id === '.' ? 0 : id) * index,
    0,
  );
};

export const expected2 = null;
