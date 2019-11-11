import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ToggleNotesButton } from '../../components/ToggleNotesButton';

describe('<ToggleNotesButton />', () => {
  let wrapper: ShallowWrapper;

  const toggleNotes = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <ToggleNotesButton toggleNotes={toggleNotes}></ToggleNotesButton>
      ))
  );

  it('renders children a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('calls the toggleNotes prop on click', () => {
    wrapper.simulate('click');
    expect(toggleNotes).toHaveBeenCalled();
  });
});
