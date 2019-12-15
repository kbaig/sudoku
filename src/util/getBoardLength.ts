import { BoardType } from '../types/gameBoard';
import { reduce, map } from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';

const getArrayLength = <A>(arr: A[]) => arr.length;
const sum = (a: number, b: number) => a + b;

const getBoardLength: (board: BoardType) => number = flow(
  map(getArrayLength),
  reduce(0, sum)
);
export default getBoardLength;
