import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import selectedTileReducer, { SelectedTileAction } from './ducks/selectedTile';
import { generateBoard } from '../util/board';

const rootReducer = combineReducers({
  board: boardReducer,
  selectedTile: selectedTileReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction | SelectedTileAction;

const initialState: State = {
  board: generateBoard(),
  selectedTile: null
};

export const store = createStore(rootReducer, initialState);
