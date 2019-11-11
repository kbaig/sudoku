import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import { generateBoard } from '../util/board';

const rootReducer = combineReducers({
  board: boardReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction;

const initialState: State = {
  board: {
    gameBoard: generateBoard(),
    selectedTile: null,
    isInNotesMode: false
  }
};

export const store = createStore(
  rootReducer,
  initialState,
  typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
