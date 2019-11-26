import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HintButton } from '../../components/HintButton';

describe('<HintButton />', () => {
  let wrapper: ShallowWrapper;
  const getHint = jest.fn();

  beforeEach(() => (wrapper = shallow(<HintButton getHint={getHint} />)));

  it('renders a button', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('calls eraseTile on click', () => {
    wrapper.simulate('click');
    expect(getHint).toHaveBeenCalled();
  });
});
