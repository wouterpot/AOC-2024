// Download a file from https://adventofcode.com/2024/day/1/input, where 1 is the day number.

import * as fs from 'fs';
import axios from 'axios';

const url = (day: number) => `https://adventofcode.com/2024/day/${day}/input`;

async function downloadDay(day: number) {
  await downloadFile(day, 'part1');
  await downloadFile(day, 'part2');

  // Copy file from ./src/template/index.ts to ./src/day{day}/index.ts
  copyFile(day);
  copyFile(day, 'index.spec.ts');
}

function copyFile(day: number, file = 'index.ts') {
  const template = fs.readFileSync(`./src/template/${file}`, 'utf8');
  const path = `./src/day${day}/${file}`;
  fs.writeFileSync(path, template);
}

async function downloadFile(day: number, file: string) {
  const path = `./src/day${day}/inputs/${file}.txt`;

  // Pass session cookie as a header
  const Cookie = fs.readFileSync('./src/cookie.txt', 'utf8').trim();
  const response = await axios.get(url(day), {
    headers: {
      Cookie,
    },
  });

  // Create path recursively
  fs.mkdirSync(`./src/day${day}/inputs`, { recursive: true });
  fs.writeFileSync(path, response.data);
}

// download day by running `ts-node src/download.ts 1`
downloadDay(parseInt(process.argv[2]));
