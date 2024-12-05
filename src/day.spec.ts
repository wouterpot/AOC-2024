import * as fs from 'fs';
const days = [...Array(40).keys()].map((day) => day + 1);
import R from 'ramda';

xdescribe('Manually', () => {
  runDay(5);
});

function runDay(day: number) {
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
    const content = fs
      .readFileSync(`./src/day${day}/inputs/part1.txt`)
      .toString();
    const result = solve1(transform(content));
    return result;
  }

  function partTwo(): string {
    const content = fs
      .readFileSync(`./src/day${day}/inputs/part2.txt`)
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
