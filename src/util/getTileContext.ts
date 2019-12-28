import { Coords, BoardType, TileType } from '../types/gameBoard';
import { flow } from 'fp-ts/lib/function';
import { uniq, map, flatten, filter } from 'fp-ts/lib/Array';
import { eqString } from 'fp-ts/lib/Eq';
import { pipe } from 'fp-ts/lib/pipeable';
import { mapWithIndex } from 'fp-ts/lib/Array';
import { getCorner } from './getCorner';
import { getInnerSquareLength } from './getInnerSquareLength';
import { split } from 'ramda';

const getCoordsFromString: (str: string) => Coords = flow(
  split(','),
  map(parseInt)
) as (str: string) => Coords;

export const getTileContext: (board: BoardType, coords: Coords) => Coords[] = (
  board,
  [row, col]
) => {
  const getRowCoords = mapWithIndex<TileType[], string>(
    (_, col) => `${row},${col}`
  );
  const getColCoords = mapWithIndex<TileType[], string>(
    (_, row) => `${row},${col}`
  );

  const innerSquareLength = getInnerSquareLength(board);
  const getBoardCorner = getCorner(innerSquareLength);

  const topRow = getBoardCorner(row);
  const leftCol = getBoardCorner(col);

  const getInnerSquareCoords = flow(
    (board: BoardType) => board.slice(topRow, topRow + innerSquareLength),
    mapWithIndex((i, row) =>
      pipe(
        row,
        row => row.slice(leftCol, leftCol + innerSquareLength),
        mapWithIndex(j => `${i + topRow},${j + leftCol}`)
      )
    ),
    flatten
  );

  const passedInTileCoords = `${row},${col}`;
  const removePassedInTile = filter<string>(
    coordString => coordString !== passedInTileCoords
  );

  return pipe(
    [getRowCoords, getColCoords, getInnerSquareCoords],
    map(f => f(board)),
    flatten,
    uniq(eqString),
    removePassedInTile,
    map(getCoordsFromString)
  );
};
