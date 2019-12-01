import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UndoButton } from '../../components/UndoButton';

describe('<UndoButton />', () => {
  let wrapper: ShallowWrapper;
  const undo = jest.fn();

  beforeEach(() => (wrapper = shallow(<UndoButton undo={undo} />)));

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('calls eraseTile on click', () => {
    expect(undo).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(undo).toHaveBeenCalledTimes(1);
  });
});
