import { curry } from 'ramda';
import { BoardType, TileType, Coords } from '../types/gameBoard';
import { pipe } from 'fp-ts/lib/pipeable';
import { Either, chain, right, left } from 'fp-ts/lib/Either';

const getTileUncurried: (
  board: BoardType,
  coords: Coords
) => Either<string, TileType> = (board, [row, col]) => {
  return pipe(
    board,
    board => (board[row] ? right(board[row]) : left('invalid row index')),
    chain(row => (row[col] ? right(row[col]) : left('invalid column index')))
  );
};

export const getTile = curry(getTileUncurried);
