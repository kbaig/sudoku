import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import timeReducer, { TimerAction } from './ducks/timer';
import { getNewBoard } from '../util/generateBoard';

const rootReducer = combineReducers({
  board: boardReducer,
  timer: timeReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction | TimerAction;

const { withEmptyTiles, solved } = getNewBoard();

const initialState: State = {
  board: {
    solvedBoard: solved,
    currentBoard: withEmptyTiles,
    initialBoard: withEmptyTiles.map(row => row.map(tile => ({ ...tile }))),
    boardHistory: [withEmptyTiles.map(row => row.map(tile => ({ ...tile })))],
    selectedTile: null,
    isInNotesMode: false,
    isInCheckForMistakesMode: true
  },
  timer: {
    seconds: 0,
    isPlaying: true
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
