import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Board } from '../../components/Board';
import {
  generateBoard,
  getBoardLength,
  isInSameSquare
} from '../../util/board';
import Tile from '../../components/Tile';

describe('<Board />', () => {
  let wrapper: ShallowWrapper;

  const board = generateBoard();
  const boardLength = getBoardLength(board);
  const selectTile = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <Board gameBoard={board} selectedTile={null} selectTile={selectTile} />
      ))
  );

  it('renders the right number of <Tile />s', () => {
    expect(wrapper.find(Tile).length).toBe(boardLength);
  });

  it('should correctly assign onClick prop to <Tile />s', () => {
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        wrapper.childAt(i * board.length + j).prop('onClick')();
        expect(selectTile).toHaveBeenCalledWith(i, j);
      });
    });
  });

  it('should correctly assign isSelected prop to <Tile />s', () => {
    expect(wrapper.find({ isSelected: true }).length).toBe(0);

    wrapper = shallow(
      <Board gameBoard={board} selectedTile={[0, 0]} selectTile={selectTile} />
    );

    expect(wrapper.childAt(0).prop('isSelected')).toBe(true);
    expect(wrapper.find({ isSelected: true }).length).toBe(1);
  });

  it('should correctly assign isHighlighted prop to <Tile />s', () => {
    expect(wrapper.find({ isHighlighted: true }).length).toBe(0);

    const selectedRow = 0;
    const selectedCol = 0;
    const innerSquareLength = Math.sqrt(board.length);

    wrapper = shallow(
      <Board
        gameBoard={board}
        selectedTile={[selectedRow, selectedCol]}
        selectTile={selectTile}
      />
    );

    expect(wrapper.find({ isHighlighted: true }).length).toBe(
      board.length * 3 - innerSquareLength * 2
    );
    board.forEach((row, i) => {
      row.forEach((col, j) => {
        expect(
          wrapper.childAt(i * board.length + j).prop('isHighlighted')
        ).toBe(
          i === selectedRow ||
            j === selectedCol ||
            isInSameSquare([i, j], [selectedRow, selectedCol], board)
        );
      });
    });
  });
});
