import { TileType, BoardType, Row, Coords } from '../types/gameBoard';

const isCorrectValue = ({ type }: TileType): boolean =>
  type === 'readOnly' || type === 'correct';

// modify passed in board with animation values based on tile that was just entered
export const evaluateContext = (
  gameBoard: BoardType,
  [row, col]: Coords
): BoardType => {
  // row
  const rowTiles = gameBoard[row];
  const shouldAnimateRow = rowTiles.every(isCorrectValue);
  gameBoard[row] = rowTiles.map((tile, j) => ({
    ...tile,
    animationDelay: shouldAnimateRow ? 50 + Math.abs(col - j) * 50 : null
  })) as Row;

  // column
  const columnTiles = gameBoard.map(row => row[col]);
  const shouldAnimateColumn = columnTiles.every(isCorrectValue);
  columnTiles.forEach((tile, i) => {
    // rechecking as a type guard because TS is complaining
    if (tile.type === 'readOnly' || tile.type === 'correct') {
      gameBoard[i][col] = {
        ...tile,
        animationDelay: shouldAnimateColumn ? 50 + Math.abs(row - i) * 50 : null
      };
    } else {
      gameBoard[i][col] = {
        ...tile,
        animationDelay: null
      };
    }
  });

  // inner square - last for precedence
  const topRow = Math.floor(row / 3) * 3;
  const leftCol = Math.floor(col / 3) * 3;
  const innerSquareTiles = gameBoard
    .slice(topRow, topRow + 3)
    .map((row, i) => row.slice(leftCol, leftCol + 3));
  const shouldAnimateInnerSquare = innerSquareTiles.every(row =>
    row.every(isCorrectValue)
  );
  if (shouldAnimateInnerSquare) {
    innerSquareTiles.forEach((tileRow, i) =>
      tileRow.forEach((tile, j) => {
        // rechecking as a type guard because TS is complaining
        if (tile.type === 'readOnly' || tile.type === 'correct') {
          gameBoard[topRow + i][leftCol + j] = {
            ...tile,
            animationDelay: 50 + j * 50 + i * 150
          };
        }
      })
    );
  } else {
    innerSquareTiles.forEach((tileRow, i) =>
      tileRow.forEach((tile, j) => {
        // don't override animation from a row or column being completed
        if (
          !(topRow + i === row && shouldAnimateRow) &&
          !(leftCol + j === col && shouldAnimateColumn)
        ) {
          gameBoard[topRow + i][leftCol + j] = {
            ...tile,
            animationDelay: null
          };
        }
      })
    );
  }

  return gameBoard;
};
