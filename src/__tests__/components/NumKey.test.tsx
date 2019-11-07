import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Numkey } from '../../components/Numkey';
import { TileNumberType } from '../../types/gameBoard';

describe('<Numkey />', () => {
  let wrapper: ShallowWrapper;

  const children: TileNumberType = 1;
  const pressNumber = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(<Numkey pressNumber={pressNumber}>{children}</Numkey>))
  );

  it('renders children', () => {
    expect(parseInt(wrapper.text())).toBe(children);
  });

  it('calls the onClick handler on click using the value in its children', () => {
    wrapper.simulate('click');
    expect(pressNumber).toHaveBeenCalledWith(children);
  });
});
