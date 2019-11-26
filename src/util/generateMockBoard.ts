import { BoardType } from '../types/gameBoard';
import easyBoard from '../mockData/easyBoard';

export const generateMockBoard = (): BoardType =>
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
  );
