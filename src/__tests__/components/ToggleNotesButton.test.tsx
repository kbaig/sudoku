import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ToggleNotesButton } from '../../components/ToggleNotesButton';

describe('<ToggleNotesButton />', () => {
  let wrapper: ShallowWrapper;

  const toggleNotes = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <ToggleNotesButton
          isInNotesMode
          toggleNotes={toggleNotes}
        ></ToggleNotesButton>
      ))
  );

  it('renders children a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('gives feedback on whether or not notes mode is on', () => {
    expect(wrapper.find('.toggle-notes-button__mode-status').text()).toBe('ON');

    wrapper = shallow(
      <ToggleNotesButton
        isInNotesMode={false}
        toggleNotes={toggleNotes}
      ></ToggleNotesButton>
    );

    expect(wrapper.find('.toggle-notes-button__mode-status').text()).toBe(
      'OFF'
    );
  });

  it('calls the toggleNotes prop on click', () => {
    wrapper.simulate('click');
    expect(toggleNotes).toHaveBeenCalled();
  });
});
