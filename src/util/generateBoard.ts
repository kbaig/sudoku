import { BoardType } from '../types/gameBoard';

type GeneratedTileValue = null | number;
type GeneratedBoard = GeneratedTileValue[][];

// find first empty tile, row by row, throwing if none found
export const findEmptyTile = (board: GeneratedBoard): [number, number] => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) return [i, j];
    }
  }

  throw new Error('No empty tiles');
};

export const isFull = (board: GeneratedBoard): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) return false;
    }
  }

  return true;
};

// find if adding a value to a given board would create a conflict
export const hasNoConflict = (
  value: number,
  [row, col]: [number, number],
  board: GeneratedBoard
): boolean => {
  // clone board
  const boardCopy = board.map(row => [...row]);
  boardCopy[row][col] = value;

  // check row
  const rowWithoutNulls = boardCopy[row].filter(Boolean);
  if (new Set(rowWithoutNulls).size !== rowWithoutNulls.length) return false;

  // check col
  const colWithoutNulls = boardCopy.map(row => row[col]).filter(Boolean);
  if (new Set(colWithoutNulls).size !== colWithoutNulls.length) return false;

  // check inner square
  const topRow = Math.floor(row / 3) * 3;
  const leftCol = Math.floor(col / 3) * 3;
  const innerSquareWithoutNulls = boardCopy
    .slice(topRow, topRow + 3)
    .map(row => row.slice(leftCol, leftCol + 3))
    .reduce((a, b) => [...a, ...b])
    .filter(Boolean);

  if (new Set(innerSquareWithoutNulls).size !== innerSquareWithoutNulls.length)
    return false;

  return true;
};

export const isWinnable = (board: GeneratedBoard): boolean => {
  // base case - a full board is valid
  if (isFull(board)) return true;

  // board isn't full, this is going to take some recursion
  // clone board
  const newBoard = board.map(row => [...row]);

  // get first empty tile
  const [row, col] = findEmptyTile(board);

  // try all combinations for empty tile
  for (let i = 1; i <= 9; i++) {
    if (hasNoConflict(i, [row, col], newBoard)) {
      newBoard[row][col] = i;
      if (isWinnable(newBoard)) return true;
    }
  }

  // none of the values worked, must not be winnable
  return false;
};

export const generateEmptyBoard = (): GeneratedBoard =>
  Array(9).fill(Array(9).fill(null));

export const generateBoard = (board = generateEmptyBoard()): GeneratedBoard => {
  // base case - a full board is valid
  if (isFull(board)) {
    return board;
  }

  // board isn't full, this is going to take some recursion
  // clone board
  const newBoard = board.map(row => [...row]);

  // get first empty tile
  const [row, col] = findEmptyTile(newBoard);

  // find a valid value, randomly choosing a value each time
  let attemptedValues = new Set();
  while (attemptedValues.size < 9) {
    const value = Math.ceil(Math.random() * 9);
    if (hasNoConflict(value, [row, col], newBoard)) {
      newBoard[row][col] = value;
      attemptedValues.add(value);
      if (isWinnable(newBoard)) return generateBoard(newBoard);
    }
  }

  // none of the values worked must not be winnable
  throw new Error(`Couldn't generate a board`);
};

export const hasOneSolution = (board: GeneratedBoard): boolean => {
  // base case - a full board is valid
  if (isFull(board)) return true;

  // board isn't full, this is going to take some recursion
  // clone board
  const newBoard = board.map(row => [...row]);

  // get all empty tiles
  let emptyTiles: [number, number][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!board[i][j]) emptyTiles.push([i, j]);
    }
  }

  // check if every tile has exactly one valid, winnable value
  return emptyTiles.every(([row, col]) => {
    let validValuesCount = 0;
    // try all values for empty tile
    for (let i = 1; i <= 9; i++) {
      if (hasNoConflict(i, [row, col], newBoard)) {
        newBoard[row][col] = i;

        if (isWinnable(newBoard)) {
          validValuesCount++;

          // optimization - return early more than one solution is found
          if (validValuesCount > 1) return false;
        }

        // reset
        newBoard[row][col] = null;
      }
    }

    // we're probably only here if 0 or 1 solutions have been found
    return validValuesCount === 1;
  });
};

export const subtractNTiles = (
  board: GeneratedBoard,
  n: number
): GeneratedBoard => {
  // base case - no work to do if n is 0
  if (n === 0) return board;

  let row: number, col: number;
  let shouldExit: boolean = false;
  do {
    // get nonempty tile
    do {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    } while (!board[row][col]);

    // remember in case this is a bad choice
    const oldVal = board[row][col];

    board[row][col] = null;

    if (hasOneSolution(board)) return subtractNTiles(board, n - 1);

    // doensn't have one solution, reset
    board[row][col] = oldVal;
  } while (!shouldExit);

  throw new Error(`Couldn't find a subtraction with one solution`);
};

export const getNewBoard = (): {
  withEmptyTiles: BoardType;
  solved: BoardType;
} => {
  const board = generateBoard();

  return {
    solved: board.map(row =>
      row.map(value => ({
        type: value ? 'readOnly' : 'blank',
        value,
        animationDelay: null
      }))
    ) as BoardType,
    withEmptyTiles: subtractNTiles(board, 40).map(row =>
      row.map(value => ({
        type: value ? 'readOnly' : 'blank',
        value,
        animationDelay: null
      }))
    ) as BoardType
  };
};
