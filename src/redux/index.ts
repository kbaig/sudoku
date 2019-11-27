import { createStore, combineReducers } from 'redux';
import boardReducer, { BoardAction } from './ducks/board';
import timeReducer, { TimeAction, incrementTime } from './ducks/time';
import { getNewBoard } from '../util/generateBoard';

const rootReducer = combineReducers({
  board: boardReducer,
  time: timeReducer
});

export type State = ReturnType<typeof rootReducer>;

export type ActionType = BoardAction | TimeAction;

const { withEmptyTiles, solved } = getNewBoard();

const initialState: State = {
  board: {
    gameBoard: withEmptyTiles,
    solved,
    selectedTile: null,
    isInNotesMode: false,
    isPaused: false
  },
  time: 0
};

export const store = createStore(
  rootReducer,
  initialState,
  typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

setInterval(() => {
  store.dispatch(incrementTime());
}, 1000);
