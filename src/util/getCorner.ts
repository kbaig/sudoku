import { flow } from 'fp-ts/lib/function';

export const getCorner: (
  squareLength: number
) => (n: number) => number = squareLength =>
  flow(
    n => n / squareLength,
    Math.floor,
    n => n * squareLength
  );
