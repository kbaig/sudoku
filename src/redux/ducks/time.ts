import { Reducer } from 'redux';

//types
export type Time = number;

// actions
const TIME_INCREMENTED = 'TIME_INCREMENTED';

// action creators
interface SelectTileAction {
  type: typeof TIME_INCREMENTED;
}

export type TimeAction = SelectTileAction;

export const incrementTime = (): TimeAction => ({
  type: TIME_INCREMENTED
});

// default state
const defaultState: Time = 0;

// reducer
const reducer: Reducer<Time, TimeAction> = (state = defaultState, action) => {
  switch (action.type) {
    case TIME_INCREMENTED:
      return state + 1;
    default:
      return state;
  }
};

export default reducer;
