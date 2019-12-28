import { BoardType, Coords } from '../types/gameBoard';
import { getEq } from 'fp-ts/lib/Array';
import { contramap, eqNumber } from 'fp-ts/lib/Eq';
import { getCorner } from './getCorner';
import { getInnerSquareLength } from './getInnerSquareLength';
import { pipe } from 'fp-ts/lib/pipeable';
import { curry } from 'ramda';

const getEqCorner = (length: number) => contramap(getCorner(length))(eqNumber);
const getEqSquare = (length: number) => getEq(getEqCorner(length));

const isInSameSquareUncurried: (
  board: BoardType,
  tile1: Coords,
  tile2: Coords
) => boolean = (board, tile1, tile2) => {
  const eqSquare = pipe(board, getInnerSquareLength, getEqSquare);

  return eqSquare.equals(tile1, tile2);
};

export const isInSameSquare = curry(isInSameSquareUncurried);
