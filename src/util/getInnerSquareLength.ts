import { BoardType } from '../types/gameBoard';
import { flow } from 'fp-ts/lib/function';
import getBoardLength from './getBoardLength';
import { fourthRoot } from './fourthRoot';

export const getInnerSquareLength: (board: BoardType) => number = flow(
  getBoardLength,
  fourthRoot
);
