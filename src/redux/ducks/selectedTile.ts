import { Reducer } from 'redux';

// types
export type SelectedTile = null | [number, number];

// actions
const TILE_SELECTED = 'TILE_SELECTED';

// action creators
interface SelectTileAction {
  type: typeof TILE_SELECTED;
  payload: {
    row: number;
    column: number;
  };
}

export type SelectedTileAction = SelectTileAction;

export const selectTile = (
  row: number,
  column: number
): SelectedTileAction => ({
  type: TILE_SELECTED,
  payload: { row, column }
});

// default state
const defaultState = null;

// reducer
const reducer: Reducer<SelectedTile, SelectedTileAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case TILE_SELECTED:
      const { row, column } = action.payload;
      return [row, column];
    default:
      return state;
  }
};

export default reducer;
