import * as R from 'ramda';

export const transform = R.pipe(R.trim, R.split(' '));

const isEven = (num: string) => num.length % 2 === 0;

export const removeLeadingZeros = (num: string) => {
  let i = 0;
  while (num[i] === '0') i++;
  const result = num.slice(i);
  return result ? result : '0';
};

const splitInHalf = (num: string) => [
  removeLeadingZeros(num.slice(0, num.length / 2)),
  removeLeadingZeros(num.slice(num.length / 2)),
];

export const solve11 = (nums: string[]) => {
  nums = solve(nums, 25);
  return nums.length;
};

export const expected1 = 183484;

export const solve2 = (nums: string[]) => {
  return solve(nums, 12).length;
};

export const expected2 = null;

function solve(nums: string[], blinks: number) {
  for (let blink = 0; blink < blinks; blink++) {
    const newNums = [];
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (num === '0') newNums.push('1');
      else if (isEven(num)) newNums.push(...splitInHalf(num));
      else newNums.push((Number(num) * 2024).toString());
    }
    console.log(newNums.length);
    nums = newNums;
  }
  return nums;
}
