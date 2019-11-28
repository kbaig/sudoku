import { Reducer } from 'redux';

//types
export interface TimerState {
  seconds: number;
  isPlaying: boolean;
}

// actions
const PAUSE_PLAY_BUTTON_PRESSED = 'PAUSE_PLAY_BUTTON_PRESSED';
const TIME_INCREMENTED = 'TIME_INCREMENTED';

// action creators
interface TogglePauseAction {
  type: typeof PAUSE_PLAY_BUTTON_PRESSED;
}

interface SelectTileAction {
  type: typeof TIME_INCREMENTED;
}

export type TimerAction = TogglePauseAction | SelectTileAction;

export const togglePause = (): TimerAction => ({
  type: PAUSE_PLAY_BUTTON_PRESSED
});

export const incrementTime = (): TimerAction => ({
  type: TIME_INCREMENTED
});

// default state
const defaultState: TimerState = {
  seconds: 0,
  isPlaying: true
};

// reducer
const reducer: Reducer<TimerState, TimerAction> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case PAUSE_PLAY_BUTTON_PRESSED:
      return { ...state, isPlaying: !state.isPlaying };
    case TIME_INCREMENTED:
      return { ...state, seconds: state.seconds + 1 };
    default:
      return state;
  }
};

export default reducer;
