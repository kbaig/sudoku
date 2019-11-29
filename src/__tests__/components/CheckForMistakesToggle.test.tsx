import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CheckForMistakesToggle } from '../../components/CheckForMistakesToggle';

describe('<CheckForMistakesToggle />', () => {
  let wrapper: ShallowWrapper;
  const toggleCheckForMistakes = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <CheckForMistakesToggle
          isInCheckForMistakesMode
          toggleCheckForMistakes={toggleCheckForMistakes}
        />
      ))
  );

  it('gives feedback on whether the Check for Mistakes mode is enabled', () => {
    expect(wrapper.find('.check-for-mistakes-toggle--enabled').length).toBe(1);

    wrapper = shallow(
      <CheckForMistakesToggle
        isInCheckForMistakesMode={false}
        toggleCheckForMistakes={toggleCheckForMistakes}
      />
    );

    expect(wrapper.find('.check-for-mistakes-toggle--enabled').length).toBe(0);
  });

  it('calls the toggle  mistakes mode handler on click', () => {
    expect(toggleCheckForMistakes).not.toHaveBeenCalled();

    wrapper.find(`.check-for-mistakes-toggle__checkbox`).simulate('change');

    expect(toggleCheckForMistakes).toHaveBeenCalled();
  });
});
