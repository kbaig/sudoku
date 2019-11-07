import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Keypad from '../../components/Keypad';
import Numkey from '../../components/Numkey';

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('<Keypad />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => (wrapper = shallow(<Keypad />)));

  it(`renders ${keys.length} <Numkey />s with correct values`, () => {
    expect(wrapper.find(Numkey).length).toBe(keys.length);

    keys.forEach((n, i) => {
      expect(wrapper.childAt(i).prop('children')).toEqual(n);
    });
  });
});
