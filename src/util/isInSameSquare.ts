import { BoardType } from '../types/gameBoard';
import { flow } from 'fp-ts/lib/function';
import { getEq } from 'fp-ts/lib/Array';
import { contramap, eqNumber } from 'fp-ts/lib/Eq';
import { getCorner } from './getCorner';
import { getInnerSquareLength } from './getInnerSquareLength';

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
