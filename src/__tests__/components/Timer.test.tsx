import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Timer } from '../../components/Timer';

describe('<Timer />', () => {
  let wrapper: ShallowWrapper;

  it('renders children correctly', () => {
    wrapper = shallow(<Timer time={0} />);
    expect(wrapper.text()).toBe('00:00');

    wrapper = shallow(<Timer time={59} />);
    expect(wrapper.text()).toBe('00:59');

    wrapper = shallow(<Timer time={60} />);
    expect(wrapper.text()).toBe('01:00');

    wrapper = shallow(<Timer time={61} />);
    expect(wrapper.text()).toBe('01:01');

    wrapper = shallow(<Timer time={119} />);
    expect(wrapper.text()).toBe('01:59');

    wrapper = shallow(<Timer time={599} />);
    expect(wrapper.text()).toBe('09:59');

    wrapper = shallow(<Timer time={600} />);
    expect(wrapper.text()).toBe('10:00');

    wrapper = shallow(<Timer time={5999} />);
    expect(wrapper.text()).toBe('99:59');

    wrapper = shallow(<Timer time={6000} />);
    expect(wrapper.text()).toBe('100:00');
  });
});
