import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PausedBoardOverlay } from '../../components/PausedBoardOverlay';

describe('<PausedBoardOverlay />', () => {
  let wrapper: ShallowWrapper;

  const resumeGame = jest.fn();

  beforeEach(
    () => (wrapper = shallow(<PausedBoardOverlay resumeGame={resumeGame} />))
  );

  it('calls the onClick handler on click using the value in its children', () => {
    expect(resumeGame).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(resumeGame).toHaveBeenCalledTimes(1);
  });
});
