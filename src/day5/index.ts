import * as R from 'ramda';

const splitRules = R.pipe(
  R.split('\n'),
  R.map(R.pipe(R.split('|'), R.map(Number))),
);

const parsePubs = R.pipe(
  R.split('\n'),
  R.filter(Boolean),
  R.map(R.pipe(R.split(','), R.map(Number))),
);

export const transform = R.pipe(R.split('\n\n'), ([rules, pubs]) => [
  splitRules(rules),
  parsePubs(pubs),
]);

const getRules = (
  rules: number[][],
  page: number,
  pub: number[],
): number[][] => {
  return rules.filter(
    (rule) =>
      (rule[0] === page || rule[1] === page) &&
      pub.includes(rule[0]) &&
      pub.includes(rule[1]),
  );
};

export const solve1 = ([rules, pubs]: [number[][], number[][]]) => {
  const valid = getValid(pubs, rules);
  const middles = valid.map((pub) => pub[Math.floor(pub.length / 2)]);
  return R.sum(middles);
};

export const expected1 = 5509;

const sortByWithRules = (pub: number[], rules: number[][]): number[] => {
  const ruleMap = new Map<number, Set<number>>();

  rules.forEach(([left, right]) => {
    if (!ruleMap.has(left)) ruleMap.set(left, new Set());
    ruleMap.get(left)!.add(right);
  });

  const compare = (a: number, b: number): number => {
    if (ruleMap.has(a) && ruleMap.get(a)!.has(b)) return -1;
    if (ruleMap.has(b) && ruleMap.get(b)!.has(a)) return 1;
    return 0;
  };

  return pub.slice().sort(compare);
};

export const solve2 = ([rules, pubs]: [number[][], number[][]]) => {
  const valid = getValid(pubs, rules);
  const invalid = R.difference(pubs, valid);
  const sorted = invalid.map((pub) => {
    return sortByWithRules(pub, rules);
  });
  const middles = sorted.map((pub) => pub[Math.floor(pub.length / 2)]);
  return R.sum(middles);
};

export const expected2 = 4407;

function getValid(pubs: number[][], rules: number[][]) {
  return pubs.filter((pub) => {
    const pubRules = pub.map((page) => getRules(rules, page, pub)).flat();
    const valid = pubRules.every(([left, right]) => {
      return pub.indexOf(left) < pub.indexOf(right);
    });
    return valid;
  });
}
