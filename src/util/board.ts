import {
  BoardType,
  CorrectTile,
  NotesTile,
  TileValue,
  BlankTile,
  TileNumberType,
  WrongTile
} from '../types/gameBoard';

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
  isInNotesMode: boolean
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

  const rowCoords = boardCopy[row].map((_, j) => `${row},${j}`);
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

  return boardCopy;
};
