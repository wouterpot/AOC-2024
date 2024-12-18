import * as fs from 'fs';
const days = [...Array(40).keys()].map((day) => day + 1);
import R from 'ramda';

describe('Manually', () => {
  runDay(9);
});

describe('Manual example', () => {
  runDay(10, 'example3');
});

function runDay(day: number, example?: string) {
  const file = `./day${day}/index`;
  const exists = fs.existsSync(`./src/${file}.ts`);
  if (!exists) return;
  const {
    solve1,
    solve2,
    expected1,
    expected2,
    transform = R.identity,
  } = require(file);

  function partOne(): string {
    const file = example ?? 'part1';
    const content = fs
      .readFileSync(`./src/day${day}/inputs/${file}.txt`)
      .toString();
    const result = solve1(transform(content));
    return result;
  }

  function partTwo(): string {
    const file = example ?? 'part2';
    const content = fs
      .readFileSync(`./src/day${day}/inputs/${file}.txt`)
      .toString();
    const result = solve2(transform(content));
    return result;
  }

  if (solve1)
    it(`day${day}: part 1`, () => {
      expect(partOne()).toBe(expected1);
    });

  if (!solve2) return;
  it(`day${day}: part 2`, () => {
    expect(partTwo()).toBe(expected2);
  });
}

days.forEach((day) => {
  describe(`day${day}`, () => {
    runDay(day);
  });
});

const day = parseInt(process.argv[2]);
if (day) {
  const file = process.argv[3];
  runDay(day, file);
}
