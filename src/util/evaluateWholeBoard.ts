import { BoardType } from '../types/gameBoard';
import { getTileContext } from './getTileContext';

export const evaluateWholeBoardWithMistakes = (
  board: BoardType,
  solved: BoardType
): BoardType =>
  board.map((row, i) =>
    row.map((tile, j) => {
      if (
        tile.type === 'blank' ||
        tile.type === 'readOnly' ||
        tile.type === 'notes'
      ) {
        return tile;
      } else {
        return {
          ...tile,
          type: solved[i][j].value === tile.value ? 'correct' : 'wrong',
          animationDelay: null
        };
      }
    })
  );

export const evaluateWholeBoardWithoutMistakes = (
  board: BoardType
): BoardType =>
  board.map((row, i) =>
    row.map((tile, j) => {
      if (
        tile.type === 'blank' ||
        tile.type === 'readOnly' ||
        tile.type === 'notes'
      ) {
        return tile;
      } else {
        const sameContextCoords = getTileContext(board, [i, j]);

        return {
          ...tile,
          type: sameContextCoords.some(([tileRow, tileCol]) => {
            return board[tileRow][tileCol].value === tile.value;
          })
            ? 'wrong'
            : 'correct',
          value: tile.value,
          animationDelay: null
        };
      }
    })
  );
