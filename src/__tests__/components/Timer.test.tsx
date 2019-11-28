import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Timer } from '../../components/Timer';

describe('<Timer />', () => {
  let wrapper: ShallowWrapper;

  const incrementTime = jest.fn();

  it('renders children correctly', () => {
    wrapper = shallow(
      <Timer seconds={0} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('00:00');

    wrapper = shallow(
      <Timer seconds={59} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('00:59');

    wrapper = shallow(
      <Timer seconds={60} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('01:00');

    wrapper = shallow(
      <Timer seconds={61} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('01:01');

    wrapper = shallow(
      <Timer seconds={119} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('01:59');

    wrapper = shallow(
      <Timer seconds={599} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('09:59');

    wrapper = shallow(
      <Timer seconds={600} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('10:00');

    wrapper = shallow(
      <Timer seconds={5999} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('99:59');

    wrapper = shallow(
      <Timer seconds={6000} incrementTime={incrementTime} isPlaying={false} />
    );
    expect(wrapper.text()).toBe('100:00');
  });
});
