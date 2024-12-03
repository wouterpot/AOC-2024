import * as R from 'ramda';

export const transform = R.split('\n');

export const solve1 = (lines: string[]) => {
  const muls = lines.map((line) => {
    // Scan line for mul(int,int) calls
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    let sum = 0;
    while (true) {
      const match = mulRegex.exec(line);
      if (!match) break;
      const [_, a, b] = match;
      sum += parseInt(a) * parseInt(b);
    }
    return sum;
  });
  return R.sum(muls);
};

export const expected1 = 166630675;

export const solve2 = (content: string[]) => {
  const line = content.join();
  // Scan line for mul(int,int) calls
  const mulRegex = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
  let sum = 0;
  let sumEnabled = true;
  while (true) {
    const match = mulRegex.exec(line);
    if (!match) break;
    const [instr, _, a, b] = match;
    if (instr === 'do()') {
      sumEnabled = true;
      continue;
    } else if (instr === "don't()") {
      sumEnabled = false;
      continue;
    }
    if (!sumEnabled) continue;
    sum += parseInt(a) * parseInt(b);
  }
  return sum;
};

export const expected2 = null;
