import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Tile from '../../components/Tile';
import { TileValue, TileNumberType } from '../../types/gameBoard';

describe('<Tile />', () => {
  let wrapper: ShallowWrapper;

  const tileNumbers: TileNumberType[] = [1, 2, 6, 5, 3, 7, 9];
  const children = tileNumbers[0];
  const handleClick = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <Tile type='correct' onClick={handleClick}>
          {children}
        </Tile>
      ))
  );

  it('renders children correctly', () => {
    wrapper = shallow(
      <Tile type='readOnly' onClick={handleClick}>
        {tileNumbers[0]}
      </Tile>
    );

    expect(parseInt(wrapper.text())).toBe(tileNumbers[0]);

    wrapper = shallow(
      <Tile type='blank' onClick={handleClick}>
        {}
      </Tile>
    );
    expect(wrapper.text()).toBe('');

    wrapper = shallow(
      <Tile type='correct' onClick={handleClick}>
        {tileNumbers[2]}
      </Tile>
    );

    expect(parseInt(wrapper.text())).toBe(tileNumbers[2]);

    wrapper = shallow(
      <Tile type='notes' onClick={handleClick}>
        {new Set(tileNumbers)}
      </Tile>
    );

    const notes = wrapper.find('.note');

    expect(notes.length).toBe(tileNumbers.length);

    const sortedTileNumbers = Array.from(tileNumbers).sort((a, b) => a - b);
    notes.forEach((note, i) => {
      const value = parseInt(note.text());
      expect(value).toBe(sortedTileNumbers[i]);
      expect(note.prop('style')).toEqual({
        gridColumnStart: value % 3 || 3,
        gridRowStart: Math.ceil(value / 3)
      });
    });
  });

  it('should have .tile--selected if it is selected', () => {
    expect(wrapper.find('.tile--selected').length).toBe(0);

    wrapper = shallow(
      <Tile type='readOnly' isSelected onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--selected').length).toBe(1);
  });

  it('should have .tile--highlighted if it is highlighted', () => {
    expect(wrapper.find('.tile--highlighted').length).toBe(0);

    wrapper = shallow(
      <Tile type='readOnly' isHighlighted onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--highlighted').length).toBe(1);
  });

  it('should have .tile--same-selected if the same value is selected', () => {
    expect(wrapper.find('.tile--same-selected').length).toBe(0);

    wrapper = shallow(
      <Tile type='readOnly' sameIsSelected onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--same-selected').length).toBe(1);
  });

  it('should only have .tile--read-only if it is read only', () => {
    expect(wrapper.find('.tile--read-only').length).toBe(0);

    wrapper = shallow(
      <Tile type='readOnly' onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--read-only').length).toBe(1);
  });

  it('should only have .tile--correct if it is read only', () => {
    wrapper = shallow(<Tile type='blank' onClick={handleClick} />);

    expect(wrapper.find('.tile--correct').length).toBe(0);

    wrapper = shallow(
      <Tile type='correct' onClick={handleClick}>
        {children}
      </Tile>
    );

    expect(wrapper.find('.tile--correct').length).toBe(1);
  });

  it('should only have .tile--notes if it is notes', () => {
    expect(wrapper.find('.tile--notes').length).toBe(0);

    wrapper = shallow(
      <Tile type='notes' onClick={handleClick}>
        {new Set(tileNumbers)}
      </Tile>
    );

    expect(wrapper.find('.tile--notes').length).toBe(1);
  });

  it('should call the passed click handler on click', () => {
    wrapper.find('.tile').simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
