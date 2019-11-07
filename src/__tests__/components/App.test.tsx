import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from '../../components/App';
import Board from '../../components/Board';

describe('<App />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('renders a <Board />', () => {
    expect(wrapper.find(Board).length).toBe(1);
  });
});
