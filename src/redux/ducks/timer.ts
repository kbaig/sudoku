import { Reducer } from 'redux';
import produce from 'immer';

//types
export interface TimerState {
  seconds: number;
  isPlaying: boolean;
}

// actions
const PAUSE_PLAY_BUTTON_PRESSED = 'PAUSE_PLAY_BUTTON_PRESSED';
const PAUSED_BOARD_OVERLAY_CLICKED = 'PAUSED_BOARD_OVERLAY_CLICKED';
const TIME_INCREMENTED = 'TIME_INCREMENTED';

// action creators
interface TogglePauseAction {
  type: typeof PAUSE_PLAY_BUTTON_PRESSED;
}

interface ResumeGameAction {
  type: typeof PAUSED_BOARD_OVERLAY_CLICKED;
}

interface SelectTileAction {
  type: typeof TIME_INCREMENTED;
}

export type TimerAction =
  | TogglePauseAction
  | ResumeGameAction
  | SelectTileAction;

export const togglePause = (): TimerAction => ({
  type: PAUSE_PLAY_BUTTON_PRESSED
});

export const resumeGame = (): TimerAction => ({
  type: PAUSED_BOARD_OVERLAY_CLICKED
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
) =>
  produce(state, draft => {
    switch (action.type) {
      case PAUSE_PLAY_BUTTON_PRESSED:
        draft.isPlaying = !draft.isPlaying;
        return;
      case PAUSED_BOARD_OVERLAY_CLICKED:
        draft.isPlaying = true;
        return;
      case TIME_INCREMENTED:
        draft.seconds++;
        return;
      default:
        return draft;
    }
  });

export default reducer;
