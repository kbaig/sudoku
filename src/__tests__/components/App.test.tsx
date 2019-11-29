import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../../components/App';
import Board from '../../components/Board';
import PausePlayButton from '../../components/PausePlayButton';
import Timer from '../../components/Timer';
import CheckForMistakesToggle from '../../components/CheckForMistakesToggle';

describe('<App />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('renders a <Board />', () => {
    expect(wrapper.find(Board).length).toBe(1);
  });

  it('renders a <Timer />', () => {
    expect(wrapper.find(Timer).length).toBe(1);
  });

  it('renders a <CheckForMistakesToggle />', () => {
    expect(wrapper.find(CheckForMistakesToggle).length).toBe(1);
  });

  it('renders a <PausePlayButton />', () => {
    expect(wrapper.find(PausePlayButton).length).toBe(1);
  });
});
