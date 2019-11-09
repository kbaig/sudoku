import easyBoard from '../mockData/easyBoard';
import { BoardType } from '../types/gameBoard';

export const generateBoard = (): BoardType =>
  easyBoard.map(row =>
    row.map(value => ({
      isReadOnly: typeof value === 'number',
      value
    }))
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
