import easyBoard from '../mockData/easyBoard';
import {
  BoardType,
  CorrectTile,
  NotesTile,
  TileValue,
  BlankTile,
  TileNumberType,
  WrongTile
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
  tile: BlankTile | CorrectTile | WrongTile | NotesTile,
  value: TileValue,
  [row, col]: [number, number],
  solvedBoard: BoardType,
  isInNotesMode?: boolean
): BlankTile | CorrectTile | WrongTile | NotesTile {
  // return NotesTile if in notes mode
  if (isInNotesMode) {
    let newValue: Set<TileNumberType>;

    if (value && tile.type === 'notes') {
      newValue = new Set(tile.value);
      tile.value.has(value) ? newValue.delete(value) : newValue.add(value);
    } else if (value) {
      newValue = new Set([value]);
    } else {
      newValue = new Set();
    }

    return {
      ...tile,
      type: 'notes',
      value: newValue
    };
  } else if (!value) {
    // return BlankTile
    return {
      ...tile,
      type: 'blank',
      value
    };
  } else {
    // evaluate if value is correct or not
    return {
      ...tile,
      type: solvedBoard[row][col].value === value ? 'correct' : 'wrong',
      value
    };
  }
}
