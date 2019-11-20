import easyBoard from '../mockData/easyBoard';
import {
  BoardType,
  CorrectTile,
  NotesTile,
  TileValue,
  BlankTile,
  TileNumberType,
  WrongTile,
  Row,
  TileType
} from '../types/gameBoard';

export const generateBoard = (): BoardType =>
  easyBoard.map(row =>
    row.map(value => {
      if (typeof value === 'number') {
        return {
          type: 'readOnly',
          animationDelay: null,
          value
        };
      } else {
        return {
          type: 'blank',
          animationDelay: null,
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
      value: newValue,
      animationDelay: null
    };
  } else if (!value) {
    // return BlankTile
    return {
      ...tile,
      type: 'blank',
      value,
      animationDelay: null
    };
  } else {
    // evaluate if value is correct or not
    return {
      ...tile,
      type: solvedBoard[row][col].value === value ? 'correct' : 'wrong',
      value,
      animationDelay: null
    };
  }
}

export const processNotesAfterNumClick = (
  board: BoardType,
  [row, col]: [number, number]
): BoardType => {
  const newTile = board[row][col];
  const { value } = newTile;
  // must be a number value at the passed in coordinates
  if (typeof value !== 'number')
    throw new Error('Value at tile must be a number');

  const boardCopy = [...board.map(row => [...row])];

  const rowCoords = boardCopy[row].map((_, j) => `${row},${col}`);
  const colCoords = boardCopy.map((_, i) => `${i},${col}`);
  const topRow = Math.floor(row / 3) * 3;
  const leftCol = Math.floor(col / 3) * 3;
  const innerSquareCoords = boardCopy
    .slice(topRow, topRow + 3)
    .map((row, i) =>
      row
        .slice(leftCol, leftCol + 3)
        .map((_, j) => `${i + topRow},${j + leftCol}`)
    )
    .reduce((a, b) => a.concat(b));

  const sameContextCoords = new Set([
    ...rowCoords,
    ...colCoords,
    ...innerSquareCoords
  ]);
  sameContextCoords.delete(`${row},${col}`);

  Array.from(sameContextCoords).forEach(coord => {
    const [tileRow, tileCol] = coord.split(',').map(s => parseInt(s));

    const tile = boardCopy[tileRow][tileCol];

    if (tile.type === 'notes' && tile.value.has(value)) {
      tile.value.delete(value);
    }
  });

  return boardCopy as BoardType;
};

const isCorrectValue = ({ type }: TileType): boolean =>
  type === 'readOnly' || type === 'correct';

export const evaluateContext = (
  gameBoard: BoardType,
  [row, col]: [number, number]
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
