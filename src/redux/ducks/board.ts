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
  payload: TileNumberType;
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
    case NUMBER_PRESSED:
      // only do something if there's a selected tile and it's editable
      if (state.selectedTile) {
        const gameBoard = [...state.gameBoard] as BoardType;
        const [row, column] = state.selectedTile;

        const prevTileState = gameBoard[row][column];

        if (!prevTileState.isReadOnly) {
          // added isReadOnly into new state explicitly to inform TS
          gameBoard[row][column] = {
            ...prevTileState,
            isReadOnly: prevTileState.isReadOnly,
            value: action.payload
          };
          return { ...state, gameBoard };
        }
      }
      return state;

    default:
      return state;
  }
};

export default reducer;
