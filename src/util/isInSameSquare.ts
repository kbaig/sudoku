import { BoardType } from '../types/gameBoard';
import { flow } from 'fp-ts/lib/function';
import getBoardLength from './getBoardLength';
import { getEq } from 'fp-ts/lib/Array';
import { contramap, eqNumber } from 'fp-ts/lib/Eq';

const fourthRoot: (n: number) => number = n => Math.pow(n, 1 / 4);
const getInnerSquareLength: (board: BoardType) => number = flow(
  getBoardLength,
  fourthRoot
);
const getCorner: (
  squareLength: number
) => (n: number) => number = squareLength =>
  flow(
    n => n / squareLength,
    Math.floor,
    n => n * squareLength
  );

const getEqCorner = (length: number) => contramap(getCorner(length))(eqNumber);
const getEqSquare = (length: number) => getEq(getEqCorner(length));

const isInSameSquare: (
  board: BoardType
) => (
  tile1: [number, number]
) => (tile2: [number, number]) => boolean = board => tile1 => tile2 => {
  const eqSquare = flow(getInnerSquareLength, getEqSquare)(board);

  return eqSquare.equals(tile1, tile2);
};

export default isInSameSquare;
