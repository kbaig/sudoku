import { BoardType } from '../types/gameBoard';
import { flow } from 'fp-ts/lib/function';
import getBoardLength from './getBoardLength';
import { getInnerSquareLengthFromLength } from './getInnerSquareLengthFromLength';

export const getInnerSquareLength: (board: BoardType) => number = flow(
  getBoardLength,
  getInnerSquareLengthFromLength
);
