import { generateBoard } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';

//types
export type SelectedTile = null | [number, number];

interface BoardState {
  gameBoard: BoardType;
  selectedTile: SelectedTile;
}

// actions
const TILE_SELECTED = 'TILE_SELECTED';
const NUMBER_PRESSED = 'NUMBER_PRESSED';

// action creators
interface SelectTileAction {
  type: typeof TILE_SELECTED;
  payload: {
    row: number;
    column: number;
  };
}

interface PressNumberAction {
  type: typeof NUMBER_PRESSED;
  payload: number;
}

export type BoardAction = PressNumberAction | SelectTileAction;

export const selectTile = (row: number, column: number): SelectTileAction => ({
  type: TILE_SELECTED,
  payload: { row, column }
});

export const pressNumber = (num: TileNumberType): BoardAction => ({
  type: NUMBER_PRESSED,
  payload: num
});

// default state
const defaultState: BoardState = {
  gameBoard: generateBoard(),
  selectedTile: null
};

// reducer
const reducer: Reducer<BoardState, BoardAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case TILE_SELECTED:
      const { row, column } = action.payload;
      return { ...state, selectedTile: [row, column] };
    default:
      return state;
  }
};

export default reducer;
