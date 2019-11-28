import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NewGameButton } from '../../components/NewGameButton';

describe('<NewGameButton />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => (wrapper = shallow(<NewGameButton />)));

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('shows tooltip on click', () => {
    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(0);

    wrapper.find('.new-game-button__tooltip-button').simulate('click');

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(1);
  });

  it('should hide tooltip on click of cancel button', () => {
    wrapper.find('.new-game-button__tooltip-button').simulate('click');

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(1);

    wrapper
      .find('.new-game-button__list-item-button--cancel')
      .simulate('click');

    expect(wrapper.find('.new-game-button__tooltip-container').length).toBe(0);
  });
});
