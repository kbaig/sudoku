import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PausePlayButton } from '../../components/PausePlayButton';

describe('<PausePlayButton />', () => {
  let wrapper: ShallowWrapper;

  const togglePause = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <PausePlayButton isPaused togglePause={togglePause}></PausePlayButton>
      ))
  );

  it('renders children a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('gives feedback on pause/play status', () => {
    expect(wrapper.find('.pause-play-button--paused').length).toBe(1);

    wrapper = shallow(
      <PausePlayButton
        isPaused={false}
        togglePause={togglePause}
      ></PausePlayButton>
    );

    expect(wrapper.find('.pause-play-button--paused').length).toBe(0);
  });

  it('calls the toggleNotes prop on click', () => {
    wrapper.simulate('click');
    expect(togglePause).toHaveBeenCalled();
  });
});
