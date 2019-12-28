import produce from 'immer';
import changeTileValue from '../../util/changeTileValue';
import { TileNumberType, BoardType, Coords } from '../../types/gameBoard';
import { Reducer } from 'redux';
import { getNewBoard } from '../../util/generateBoard';
import { evaluateContext } from '../../util/evalutateContext';
import {
  evaluateWholeBoardWithoutMistakes,
  evaluateWholeBoardWithMistakes
} from '../../util/evaluateWholeBoard';
import { deepCloneBoard } from '../../util/deepCloneBoard';
import { filterNotesInTileContext } from '../../util/filterNotesInTileContext';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

//types
export type SelectedTile = null | Coords;

export interface BoardState {
  currentBoard: BoardType;
  initialBoard: BoardType;
  solvedBoard: BoardType;
  boardHistory: BoardType[];
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
const UNDO_BUTTON_PRESSED = 'UNDO_BUTTON_PRESSED';

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

interface UndoAction {
  type: typeof UNDO_BUTTON_PRESSED;
}

export type BoardAction =
  | PressNumberAction
  | SelectTileAction
  | ToggleNotesAction
  | ToggleCheckForMistakesAction
  | GetHintAction
  | EraseTileAction
  | StartNewGameAction
  | RestartGameAction
  | UndoAction;

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

export const undo = (): BoardAction => ({ type: UNDO_BUTTON_PRESSED });

const generatedBoard = getNewBoard();

// default state
const defaultState: BoardState = {
  solvedBoard: generatedBoard.solved,
  currentBoard: generatedBoard.withEmptyTiles,
  initialBoard: generatedBoard.withEmptyTiles.map(row =>
    row.map(tile => ({ ...tile }))
  ),
  boardHistory: [
    generatedBoard.withEmptyTiles.map(row => row.map(tile => ({ ...tile })))
  ],
  selectedTile: null,
  isInNotesMode: false,
  isInCheckForMistakesMode: true
};

// reducer
const reducer: Reducer<BoardState, BoardAction> = (
  state = defaultState,
  action
) => {
  return produce(state, draft => {
    switch (action.type) {
      case TILE_SELECTED:
        const { row, column } = action.payload;
        draft.selectedTile = [row, column];
        return;
      case NUMBER_PRESSED:
        // only do something if there's a selected tile and it's editable
        if (draft.selectedTile) {
          draft.currentBoard = deepCloneBoard(draft.currentBoard);
          const [row, col] = draft.selectedTile;

          const prevTileState = draft.currentBoard[row][col];

          if (prevTileState.type !== 'readOnly') {
            draft.currentBoard[row][col] = changeTileValue(
              prevTileState,
              action.payload,
              [row, col],
              draft.solvedBoard,
              draft.isInNotesMode
            );

            // only need to concern ourselves with the selected tile as far
            // as tile correctness of all tiles and win state in check for mistakes mode
            if (draft.isInCheckForMistakesMode) {
              evaluateContext(draft.currentBoard, [row, col]);
            } else {
              draft.currentBoard = evaluateWholeBoardWithoutMistakes(
                draft.currentBoard
              );
              draft.currentBoard.forEach((row, i) =>
                row.forEach((tile, j) =>
                  evaluateContext(draft.currentBoard, [i, j])
                )
              );
            }

            if (!draft.isInNotesMode) {
              draft.currentBoard = pipe(
                filterNotesInTileContext(draft.currentBoard, [row, col]),
                fold(
                  err => {
                    throw new Error(err);
                  },
                  x => x
                )
              );
            }

            draft.boardHistory.push(draft.currentBoard);
          }
        }
        return;
      case ERASE_BUTTON_PRESSED:
        // only erase if there's a selected tile, it's editable, and isn't already blank
        if (draft.selectedTile) {
          draft.currentBoard = deepCloneBoard(draft.currentBoard);
          const [row, col] = draft.selectedTile;

          const prevTileState = draft.currentBoard[row][col];

          if (prevTileState.type !== 'readOnly' && prevTileState.value) {
            draft.currentBoard[row][col] = changeTileValue(
              prevTileState,
              null,
              [row, col],
              draft.solvedBoard,
              draft.isInNotesMode
            );

            // only need to concern ourselves with the selected tile as far
            // as tile correctness of all tiles and win state in check for mistakes mode
            if (draft.isInCheckForMistakesMode) {
              evaluateContext(draft.currentBoard, [row, col]);
            } else {
              draft.currentBoard = evaluateWholeBoardWithoutMistakes(
                draft.currentBoard
              );
              draft.currentBoard.forEach((row, i) =>
                row.forEach((tile, j) =>
                  evaluateContext(draft.currentBoard, [i, j])
                )
              );
            }

            draft.boardHistory.push(draft.currentBoard);
          }
        }
        return;
      case TOGGLE_NOTES_BUTTON_PRESSED:
        draft.isInNotesMode = !draft.isInNotesMode;
        return;
      case CHECK_FOR_MISTAKES_TOGGLE_PRESSED:
        draft.isInCheckForMistakesMode = !draft.isInCheckForMistakesMode;

        if (draft.isInCheckForMistakesMode) {
          draft.currentBoard = evaluateWholeBoardWithMistakes(
            draft.currentBoard,
            draft.solvedBoard
          );
        } else {
          draft.currentBoard = evaluateWholeBoardWithoutMistakes(
            draft.currentBoard
          );
        }
        return;
      case HINT_BUTTON_PRESSED:
        if (draft.selectedTile) {
          const [row, col] = draft.selectedTile;
          const newTile = { ...draft.solvedBoard[row][col] };

          // add read only tile to each board in history so that hints can not be undone
          draft.boardHistory.forEach(board => {
            // assign read only tile
            board[row][col] = { ...newTile };

            // reevaluate board for correctness if not in check for mistakes mode
            if (!draft.isInCheckForMistakesMode) {
              evaluateWholeBoardWithoutMistakes(board);
            }

            // evaluate context for completeness since we've added a value
            evaluateContext(board, [row, col]);
          });

          // only worry about altering the notes based on new number for current board
          draft.currentBoard = pipe(
            filterNotesInTileContext(
              draft.boardHistory[draft.boardHistory.length - 1],
              [row, col]
            ),
            fold(
              err => {
                throw new Error(err);
              },
              x => x
            )
          );
        }
        return;
      case NEW_GAME_BUTTON_PRESSED:
        const { solved, withEmptyTiles } = getNewBoard();
        draft.solvedBoard = solved;
        draft.currentBoard = withEmptyTiles;
        draft.initialBoard = deepCloneBoard(withEmptyTiles);
        draft.boardHistory = [deepCloneBoard(withEmptyTiles)];
        return;
      case RESTART_BUTTON_PRESSED:
        draft.currentBoard = deepCloneBoard(draft.initialBoard);
        draft.boardHistory = [deepCloneBoard(draft.initialBoard)];
        draft.selectedTile = null;

        return;
      case UNDO_BUTTON_PRESSED:
        if (draft.boardHistory.length > 1) {
          draft.boardHistory.pop();
          draft.currentBoard =
            draft.boardHistory[draft.boardHistory.length - 1];
        } else {
          draft.currentBoard = draft.boardHistory[0];
        }
        return;
      default:
        return draft;
    }
  });
};

export default reducer;
