import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NewGameButton } from '../../components/NewGameButton';

describe('<NewGameButton />', () => {
  let wrapper: ShallowWrapper;

  const startNewGame = jest.fn();

  beforeEach(
    () => (wrapper = shallow(<NewGameButton startNewGame={startNewGame} />))
  );

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('shows tooltip on click', () => {
    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(0);

    wrapper.find('.new-game-button__tooltip-button').simulate('click');

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(1);
  });

  it('should hide tooltip on click of cancel button', () => {
    // setTimeout is used for animation
    jest.useFakeTimers();

    wrapper.find('.new-game-button__tooltip-button').simulate('click');

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(1);

    wrapper
      .find('.new-game-button__list-item-button--cancel')
      .simulate('click');

    // wait for animation to finish
    jest.runAllTimers();

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(0);
  });

  it('should call new game handler when the New Game button is pressed', () => {
    wrapper.find('.new-game-button__tooltip-button').simulate('click');

    wrapper.find('#new-game').simulate('click');

    expect(startNewGame).toHaveBeenCalled();
  });
});
