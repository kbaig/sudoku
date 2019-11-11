import easyBoard from '../mockData/easyBoard';
import {
  BoardType,
  CorrectTile,
  NotesTile,
  TileValue,
  BlankTile
} from '../types/gameBoard';

export const generateBoard = (): BoardType =>
  easyBoard.map(row =>
    row.map(value => {
      if (typeof value === 'number') {
        return {
          type: 'readOnly',
          value
        };
      } else {
        return {
          type: 'blank',
          value
        };
      }
    })
  ) as BoardType;

export const getBoardLength = (board: BoardType) =>
  board.reduce((total, row) => total + row.length, 0);

export const isInSameSquare = (
  currentTile: [number, number],
  compareToTile: [number, number],
  board: BoardType
) => {
  const innerSquareLength = Math.sqrt(board.length);

  const topRow =
    Math.floor(compareToTile[0] / innerSquareLength) * innerSquareLength;
  const bottomRow = topRow + innerSquareLength - 1;
  const leftCol =
    Math.floor(compareToTile[1] / innerSquareLength) * innerSquareLength;
  const rightCol = leftCol + innerSquareLength - 1;

  const [currentRow, currentCol] = currentTile;

  return (
    topRow <= currentRow &&
    currentRow <= bottomRow &&
    leftCol <= currentCol &&
    currentCol <= rightCol
  );
};

export function changeTileValue(
  tile: BlankTile | CorrectTile | NotesTile,
  value: TileValue,
  isInNotesMode?: boolean
): BlankTile | CorrectTile | NotesTile {
  // return NotesTile if in notes mode
  if (isInNotesMode) {
    return {
      ...tile,
      type: 'notes',
      value: !value
        ? new Set()
        : tile.type === 'notes'
        ? new Set(tile.value).add(value)
        : new Set()
    };
  } else if (!value) {
    // return BlankTile
    return {
      ...tile,
      type: 'blank',
      value
    };
  } else {
    // return CorrectTile
    return {
      ...tile,
      type: 'correct',
      value
    };
  }
}
