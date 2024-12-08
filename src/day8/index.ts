import * as R from 'ramda';
import { add, equals, Grid, Grid2D, sub } from '../grid';

export const transform = R.pipe(
  R.split('\n'),
  R.filter(Boolean),
  R.map(R.split('')),
);

export const solve1 = (rGrid: Grid<string>) => {
  const grid = new Grid2D<string>(rGrid);
  const hashes = new Set<string>();
  const antennaKinds = R.uniq(R.flatten(rGrid).filter((cell) => cell !== '.'));
  antennaKinds.forEach((symbol) => {
    const neighbouring = grid.findAll((cell) => cell === symbol);
    neighbouring.forEach((antenna) => {
      neighbouring.forEach((neighbour) => {
        if (equals(antenna, neighbour)) return;
        const diff = sub(neighbour, antenna);
        const antinodePos = sub(antenna, diff);
        const antinodePos2 = add(neighbour, diff);
        if (grid.isInside(antinodePos)) hashes.add(antinodePos.join(','));
        if (grid.isInside(antinodePos2)) hashes.add(antinodePos2.join(','));
      });
    });
  });
  return hashes.size;
};

export const expected1 = 323;

export const solve2 = (rGrid: Grid<string>) => {
  const grid = new Grid2D<string>(rGrid);
  const hashes = new Set<string>();
  const antennaKinds = R.uniq(R.flatten(rGrid).filter((cell) => cell !== '.'));
  antennaKinds.forEach((symbol) => {
    const neighbouring = grid.findAll((cell) => cell === symbol);
    for (let i = 0; i < neighbouring.length; i++) {
      for (let j = i + 1; j < neighbouring.length; j++) {
        let antenna = neighbouring[i];
        let neighbour = neighbouring[j];
        const diff = sub(neighbour, antenna);
        while (true) {
          const antinodePos = sub(neighbour, diff);
          if (!grid.isInside(antinodePos)) break;
          hashes.add(antinodePos.join(','));
          neighbour = antinodePos;
        }
        while (true) {
          const antinodePos = add(antenna, diff);
          if (!grid.isInside(antinodePos)) break;
          hashes.add(antinodePos.join(','));
          antenna = antinodePos;
        }
      }
    }
  });
  return hashes.size;
};

export const expected2 = 1077;
