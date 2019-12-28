import {
  BoardType,
  BlankTile,
  TileValue,
  ReadOnlyTile
} from '../types/gameBoard';
import easyBoard from '../mockData/easyBoard';
import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';

const createNewTile: (value: TileValue) => ReadOnlyTile | BlankTile = value =>
  typeof value === 'number'
    ? {
        type: 'readOnly',
        animationDelay: null,
        value
      }
    : {
        type: 'blank',
        animationDelay: null,
        value
      };

export const generateMockBoard: () => BoardType = () =>
  pipe(
    easyBoard,
    map(row => pipe(row, map(createNewTile)))
  );
