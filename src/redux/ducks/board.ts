import { changeTileValue, processNotesAfterNumClick } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';
import { getNewBoard } from '../../util/generateBoard';
import { evaluateContext } from '../../util/evalutateContext';

//types
export type SelectedTile = null | [number, number];

export interface BoardState {
  gameBoard: BoardType;
  solved: BoardType;
  selectedTile: SelectedTile;
  isInNotesMode: boolean;
  isPaused: boolean;
}

// actions
const TILE_SELECTED = 'TILE_SELECTED';
const NUMBER_PRESSED = 'NUMBER_PRESSED';
const TOGGLE_NOTES_BUTTON_PRESSED = 'TOGGLE_NOTES_BUTTON_PRESSED';
const HINT_BUTTON_PRESSED = 'HINT_BUTTON_PRESSED';
const ERASE_BUTTON_PRESSED = 'ERASE_BUTTON_PRESSED';
const PAUSE_PLAY_BUTTON_PRESSED = 'PAUSE_PLAY_BUTTON_PRESSED';

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

interface ToggleNotesAction {
  type: typeof TOGGLE_NOTES_BUTTON_PRESSED;
}

interface GetHintAction {
  type: typeof HINT_BUTTON_PRESSED;
}

interface EraseTileAction {
  type: typeof ERASE_BUTTON_PRESSED;
}

interface TogglePauseAction {
  type: typeof PAUSE_PLAY_BUTTON_PRESSED;
}

export type BoardAction =
  | PressNumberAction
  | SelectTileAction
  | ToggleNotesAction
  | GetHintAction
  | EraseTileAction
  | TogglePauseAction;

export const selectTile = (row: number, column: number): SelectTileAction => ({
  type: TILE_SELECTED,
  payload: { row, column }
});

export const pressNumber = (num: TileNumberType): BoardAction => ({
  type: NUMBER_PRESSED,
  payload: num
});

export const toggleNotes = (): BoardAction => ({
  type: TOGGLE_NOTES_BUTTON_PRESSED
});

export const getHint = (): BoardAction => ({ type: HINT_BUTTON_PRESSED });

export const eraseTile = (): BoardAction => ({ type: ERASE_BUTTON_PRESSED });

export const togglePause = (): BoardAction => ({
  type: PAUSE_PLAY_BUTTON_PRESSED
});

const generatedBoard = getNewBoard();

// default state
const defaultState: BoardState = {
  gameBoard: generatedBoard.withEmptyTiles,
  solved: generatedBoard.solved,
  selectedTile: null,
  isInNotesMode: false,
  isPaused: false
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

          evaluateContext(gameBoard, [row, column]);

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

          evaluateContext(gameBoard, [row, column]);

          return { ...state, gameBoard };
        }
      }
      return state;
    case TOGGLE_NOTES_BUTTON_PRESSED:
      return { ...state, isInNotesMode: !state.isInNotesMode };
    case HINT_BUTTON_PRESSED:
      const { selectedTile, gameBoard, solved } = state;
      if (selectedTile) {
        const [row, col] = selectedTile;
        gameBoard[row][col] = { ...solved[row][col] };

        evaluateContext(gameBoard, [row, col]);

        return {
          ...state,
          gameBoard: [...gameBoard]
        };
      } else {
        return state;
      }
    case PAUSE_PLAY_BUTTON_PRESSED:
      return { ...state, isPaused: !state.isPaused };
    default:
      return state;
  }
};

export default reducer;
