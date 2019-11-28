import { changeTileValue, processNotesAfterNumClick } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';
import { getNewBoard } from '../../util/generateBoard';
import { evaluateContext } from '../../util/evalutateContext';

//types
export type SelectedTile = null | [number, number];

export interface BoardState {
  solved: BoardType;
  initialUnsolvedBoard: BoardType;
  gameBoard: BoardType;
  selectedTile: SelectedTile;
  isInNotesMode: boolean;
}

// actions
const TILE_SELECTED = 'TILE_SELECTED';
const NUMBER_PRESSED = 'NUMBER_PRESSED';
const TOGGLE_NOTES_BUTTON_PRESSED = 'TOGGLE_NOTES_BUTTON_PRESSED';
const HINT_BUTTON_PRESSED = 'HINT_BUTTON_PRESSED';
const ERASE_BUTTON_PRESSED = 'ERASE_BUTTON_PRESSED';
const NEW_GAME_BUTTON_PRESSED = 'NEW_GAME_BUTTON_PRESSED';
const RESTART_BUTTON_PRESSED = 'RESTART_BUTTON_PRESSED';

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

interface StartNewGameAction {
  type: typeof NEW_GAME_BUTTON_PRESSED;
}

interface RestartGameAction {
  type: typeof RESTART_BUTTON_PRESSED;
}

export type BoardAction =
  | PressNumberAction
  | SelectTileAction
  | ToggleNotesAction
  | GetHintAction
  | EraseTileAction
  | StartNewGameAction
  | RestartGameAction;

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

export const startNewGame = (): BoardAction => ({
  type: NEW_GAME_BUTTON_PRESSED
});

export const restartGame = (): BoardAction => ({
  type: RESTART_BUTTON_PRESSED
});

const generatedBoard = getNewBoard();

// default state
const defaultState: BoardState = {
  solved: generatedBoard.solved,
  gameBoard: generatedBoard.withEmptyTiles,
  initialUnsolvedBoard: generatedBoard.withEmptyTiles.map(row =>
    row.map(tile => ({ ...tile }))
  ),
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
    case NEW_GAME_BUTTON_PRESSED:
      const newBoard = getNewBoard();
      return {
        ...state,
        solved: newBoard.solved,
        gameBoard: newBoard.withEmptyTiles,
        initialUnsolvedBoard: newBoard.withEmptyTiles.map(row =>
          row.map(tile => ({ ...tile }))
        )
      };
    case RESTART_BUTTON_PRESSED:
      return {
        ...state,
        gameBoard: state.initialUnsolvedBoard.map(row =>
          row.map(tile => ({ ...tile }))
        ),
        selectedTile: null
      };
    default:
      return state;
  }
};

export default reducer;
