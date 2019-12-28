import {
  BoardType,
  Coords,
  TileType,
  TileNumberType
} from '../types/gameBoard';
import { Either, right, left, isRight, chain, map } from 'fp-ts/lib/Either';
import { flow } from 'fp-ts/lib/function';
import { getTile } from './getTile';
import { getTileContext } from './getTileContext';
import { pipe } from 'fp-ts/lib/pipeable';

const getNumericalTileValue: (
  board: BoardType,
  coords: Coords
) => Either<string, TileNumberType> = flow(getTile, tile =>
  isRight(tile)
    ? chain((tile: TileType) =>
        typeof tile.value === 'number'
          ? right(tile.value)
          : left('tile value is not a number')
      )(tile)
    : tile
);

export const filterNotesInTileContext: (
  board: BoardType,
  coords: Coords
) => Either<string, BoardType> = (board, coords) => {
  const contextCoords = getTileContext(board, coords);

  return pipe(
    getNumericalTileValue(board, coords),
    map(val =>
      board.map((row, i) =>
        row.map((tile, j) => {
          if (
            tile.type === 'notes' &&
            contextCoords.some(([row, col]) => row === i && col === j)
          ) {
            const set = new Set(tile.value);
            set.delete(val);

            return {
              ...tile,
              value: set
            };
          } else {
            return tile;
          }
        })
      )
    )
  );
};
