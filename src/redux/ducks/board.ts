import { changeTileValue, processNotesAfterNumClick } from '../../util/board';
import { TileNumberType, BoardType } from '../../types/gameBoard';
import { Reducer } from 'redux';
import { getNewBoard } from '../../util/generateBoard';
import { evaluateContext } from '../../util/evalutateContext';
import {
  evaluateWholeBoardWithoutMistakes,
  evaluateWholeBoardWithMistakes
} from '../../util/evaluateWholeBoard';

//types
export type SelectedTile = null | [number, number];

export interface BoardState {
  solved: BoardType;
  initialUnsolvedBoard: BoardType;
  gameBoard: BoardType;
  selectedTile: SelectedTile;
  isInNotesMode: boolean;
  isInCheckForMistakesMode: boolean;
}

// actions
const TILE_SELECTED = 'TILE_SELECTED';
const NUMBER_PRESSED = 'NUMBER_PRESSED';
const TOGGLE_NOTES_BUTTON_PRESSED = 'TOGGLE_NOTES_BUTTON_PRESSED';
const CHECK_FOR_MISTAKES_TOGGLE_PRESSED = 'CHECK_FOR_MISTAKES_TOGGLE_PRESSED';
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

interface ToggleCheckForMistakesAction {
  type: typeof CHECK_FOR_MISTAKES_TOGGLE_PRESSED;
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
  | ToggleCheckForMistakesAction
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

export const toggleCheckForMistakes = (): BoardAction => ({
  type: CHECK_FOR_MISTAKES_TOGGLE_PRESSED
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
  isInNotesMode: false,
  isInCheckForMistakesMode: true
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
        let gameBoard = [...state.gameBoard] as BoardType;
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

          // only need to concern ourselves with the selected tile as far
          // as tile correctness of all tiles and win state in check for mistakes mode
          if (state.isInCheckForMistakesMode) {
            evaluateContext(gameBoard, [row, column]);
          } else {
            gameBoard = evaluateWholeBoardWithoutMistakes(gameBoard);
            gameBoard.forEach((row, i) =>
              row.forEach((tile, j) => evaluateContext(gameBoard, [i, j]))
            );
          }

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
      // only erase if there's a selected tile, it's editable, and isn't already blank
      if (state.selectedTile) {
        let gameBoard = [...state.gameBoard] as BoardType;
        const [row, column] = state.selectedTile;

        const prevTileState = gameBoard[row][column];

        if (prevTileState.type !== 'readOnly' && prevTileState.value) {
          gameBoard[row][column] = changeTileValue(
            prevTileState,
            null,
            [row, column],
            state.solved,
            state.isInNotesMode
          );

          // only need to concern ourselves with the selected tile as far
          // as tile correctness of all tiles and win state in check for mistakes mode
          if (state.isInCheckForMistakesMode) {
            evaluateContext(gameBoard, [row, column]);
          } else {
            gameBoard = evaluateWholeBoardWithoutMistakes(gameBoard);
            gameBoard.forEach((row, i) =>
              row.forEach((tile, j) => evaluateContext(gameBoard, [i, j]))
            );
          }

          return { ...state, gameBoard };
        }
      }
      return state;
    case TOGGLE_NOTES_BUTTON_PRESSED:
      return { ...state, isInNotesMode: !state.isInNotesMode };
    case CHECK_FOR_MISTAKES_TOGGLE_PRESSED:
      return {
        ...state,
        isInCheckForMistakesMode: !state.isInCheckForMistakesMode,
        gameBoard: state.isInCheckForMistakesMode
          ? evaluateWholeBoardWithoutMistakes(state.gameBoard)
          : evaluateWholeBoardWithMistakes(state.gameBoard, state.solved)
      };
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
