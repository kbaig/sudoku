import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { EraseButton } from '../../components/EraseButton';

describe('<EraseButton />', () => {
  let wrapper: ShallowWrapper;
  const eraseTile = jest.fn();

  beforeEach(() => (wrapper = shallow(<EraseButton eraseTile={eraseTile} />)));

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('calls eraseTile on click', () => {
    wrapper.simulate('click');
    expect(eraseTile).toHaveBeenCalled();
  });
});
