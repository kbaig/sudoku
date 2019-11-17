import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import { getNewBoard } from '../util/generateBoard';

const rootReducer = combineReducers({
  board: boardReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction;

const initialState: State = {
  board: {
    gameBoard: getNewBoard(),
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
