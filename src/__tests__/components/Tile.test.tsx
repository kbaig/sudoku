import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Tile from '../../components/Tile';
import { TileType } from '../../types/gameBoard';

describe('<Tile />', () => {
  let wrapper: ShallowWrapper;

  const children: TileType = 1;
  const handleClick = jest.fn();

  beforeEach(
    () => (wrapper = shallow(<Tile onClick={handleClick}>{children}</Tile>))
  );

  it('renders children', () => {
    expect(parseInt(wrapper.text())).toBe(children);
  });

  it('should have a class if it is selected', () => {
    expect(wrapper.find('.tile--selected').length).toBe(0);

    wrapper = shallow(
      <Tile isSelected onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--selected').length).toBe(1);
  });

  it('should have a class if it is highlighted', () => {
    expect(wrapper.find('.tile--highlighted').length).toBe(0);

    wrapper = shallow(
      <Tile isHighlighted onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--highlighted').length).toBe(1);
  });

  it('should call the passed click handler on click', () => {
    wrapper.find('.tile').simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
