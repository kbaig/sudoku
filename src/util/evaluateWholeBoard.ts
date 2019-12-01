import { BoardType } from '../types/gameBoard';

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
        const rowCoords = board[i].map((_, j) => `${i},${j}`);
        const colCoords = board.map((_, i) => `${i},${j}`);
        const topRow = Math.floor(i / 3) * 3;
        const leftCol = Math.floor(j / 3) * 3;
        const innerSquareCoords = board
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
        sameContextCoords.delete(`${i},${j}`);

        return {
          ...tile,
          type: Array.from(sameContextCoords).some(coord => {
            const [tileRow, tileCol] = coord.split(',').map(s => parseInt(s));
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
