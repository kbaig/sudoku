import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../../components/App';
import Board from '../../components/Board';
import PausePlayButton from '../../components/PausePlayButton';

describe('<App />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('renders a <Board />', () => {
    expect(wrapper.find(Board).length).toBe(1);
  });

  it('renders a <PausePlayButton />', () => {
    expect(wrapper.find(PausePlayButton).length).toBe(1);
  });
});
