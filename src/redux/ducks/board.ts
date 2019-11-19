import { changeTileValue, processNotesAfterNumClick } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';
import { getNewBoard } from '../../util/generateBoard';

//types
export type SelectedTile = null | [number, number];

export interface BoardState {
  gameBoard: BoardType;
  solved: BoardType;
  selectedTile: SelectedTile;
  isInNotesMode: boolean;
}

// actions
const TILE_SELECTED = 'TILE_SELECTED';
const NUMBER_PRESSED = 'NUMBER_PRESSED';
const ERASE_BUTTON_PRESSED = 'ERASE_BUTTON_PRESSED';
const TOGGLE_NOTES_BUTTON_PRESSED = 'TOGGLE_NOTES_BUTTON_PRESSED';

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

interface EraseTileAction {
  type: typeof ERASE_BUTTON_PRESSED;
}

interface ToggleNotesAction {
  type: typeof TOGGLE_NOTES_BUTTON_PRESSED;
}

export type BoardAction =
  | PressNumberAction
  | SelectTileAction
  | EraseTileAction
  | ToggleNotesAction;

export const selectTile = (row: number, column: number): SelectTileAction => ({
  type: TILE_SELECTED,
  payload: { row, column }
});

export const pressNumber = (num: TileNumberType): BoardAction => ({
  type: NUMBER_PRESSED,
  payload: num
});

export const eraseTile = (): BoardAction => ({ type: ERASE_BUTTON_PRESSED });

export const toggleNoptes = (): BoardAction => ({
  type: TOGGLE_NOTES_BUTTON_PRESSED
});

const generatedBoard = getNewBoard();

// default state
const defaultState: BoardState = {
  gameBoard: generatedBoard.withEmptyTiles,
  solved: generatedBoard.solved,
  selectedTile: null,
  isInNotesMode: false
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

        if (prevTileState.type !== 'readOnly') {
          gameBoard[row][column] = changeTileValue(
            prevTileState,
            action.payload,
            [row, column],
            state.solved,
            state.isInNotesMode
          );
          return {
            ...state,
            gameBoard: state.isInNotesMode
              ? gameBoard
              : processNotesAfterNumClick(gameBoard, [row, column])
          };
        }
      }
      return state;
    case ERASE_BUTTON_PRESSED:
      // only erase if there's a selected tile and it's editable
      if (state.selectedTile) {
        const gameBoard = [...state.gameBoard] as BoardType;
        const [row, column] = state.selectedTile;

        const prevTileState = gameBoard[row][column];

        if (prevTileState.type !== 'readOnly') {
          gameBoard[row][column] = changeTileValue(
            prevTileState,
            null,
            [row, column],
            state.solved,
            state.isInNotesMode
          );
          return { ...state, gameBoard };
        }
      }
      return state;
    case TOGGLE_NOTES_BUTTON_PRESSED:
      return { ...state, isInNotesMode: !state.isInNotesMode };
    default:
      return state;
  }
};

export default reducer;
