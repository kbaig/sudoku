import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PausedBoardOverlay } from '../../components/PausedBoardOverlay';

describe('<Numkey />', () => {
  let wrapper: ShallowWrapper;

  const resumeGame = jest.fn();

  beforeEach(
    () => (wrapper = shallow(<PausedBoardOverlay resumeGame={resumeGame} />))
  );

  it('calls the onClick handler on click using the value in its children', () => {
    wrapper.simulate('click');
    expect(resumeGame).toHaveBeenCalled();
  });
});
