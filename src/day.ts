import fs from 'fs';
import R from 'ramda';

const [, , day] = process.argv;

const file = `./day${day}/index`;
const exists = fs.existsSync(`./src/${file}.ts`);
if (!exists) throw new Error(`day${day} does not exist`);
const {
  solve1,
  solve2,
  expected1,
  expected2,
  transform = R.identity,
} = require(file);

function partOne(): string {
  if (!solve1) return '';
  const content = fs
    .readFileSync(`./src/day${day}/inputs/part1.txt`)
    .toString();
  const result = solve1(transform(content));
  return result;
}

function partTwo(): string {
  if (!solve2) return '';
  const content = fs
    .readFileSync(`./src/day${day}/inputs/part2.txt`)
    .toString();
  const result = solve2(transform(content));
  return result;
}

console.log(`day${day}: part 1`, partOne());
console.log(`day${day}: part 2`, partTwo());