import { BoardType } from '../types/gameBoard';

export const deepCloneBoard = (board: BoardType): BoardType =>
  board.map(row =>
    row.map(tile => {
      if (tile.type === 'notes') {
        return { ...tile, value: new Set(tile.value) };
      } else {
        return { ...tile };
      }
    })
  );
