import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import { generateBoard } from '../util/board';

const rootReducer = combineReducers({
  board: boardReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction;

const initialState: State = {
  board: { gameBoard: generateBoard(), selectedTile: null }
};

export const store = createStore(rootReducer, initialState);
