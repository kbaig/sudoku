import { generateBoard } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';

// actions
const NUMBER_PRESSED = 'NUMBER_PRESSED';

// action creators
interface PressNumberAction {
  type: typeof NUMBER_PRESSED;
  payload: number;
}

export type BoardAction = PressNumberAction;

export const pressNumber = (num: TileNumberType): BoardAction => ({
  type: NUMBER_PRESSED,
  payload: num
});

// default state
const defaultState = generateBoard();

// reducer
const reducer: Reducer<BoardType, BoardAction> = (
  state = defaultState,
  action: { type: string }
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
