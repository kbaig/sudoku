import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Board } from '../../components/Board';
import {
  generateBoard,
  getBoardLength,
  isInSameSquare
} from '../../util/board';
import Tile from '../../components/Tile';
import { BoardType } from '../../types/gameBoard';

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

  it('should correctly assign children prop to <Tile />s', () => {
    board.forEach((row, i) => {
      row.forEach(({ value }, j) => {
        const children = wrapper.childAt(i * board.length + j).prop('children');
        expect(children).toBe(value);
      });
    });
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

  it('should correctly assign sameIsSelected prop to <Tile />s', () => {
    expect(wrapper.find({ sameIsSelected: true }).length).toBe(0);

    const selectedRow = 0;
    const selectedCol = 3;

    wrapper = shallow(
      <Board
        gameBoard={board}
        selectedTile={[selectedRow, selectedCol]}
        selectTile={selectTile}
      />
    );

    expect(wrapper.find({ sameIsSelected: true }).length).toBe(
      board.reduce(
        (a, b) =>
          a +
          b.reduce(
            (a, b) =>
              typeof b.value === 'number' &&
              b.value === board[selectedRow][selectedCol].value
                ? a + 1
                : a,
            0
          ),
        0
      ) - 1
    );

    board.forEach((row, i) => {
      row.forEach((col, j) => {
        expect(
          wrapper.childAt(i * board.length + j).prop('sameIsSelected')
        ).toBe(
          typeof board[i][j].value === 'number' &&
            !(i === selectedRow && j === selectedCol) &&
            board[i][j].value === board[selectedRow][selectedCol].value
        );
      });
    });
  });

  it('should correctly assign sameIsIncorrectlyUsed prop to <Tile />s', () => {
    expect(wrapper.find({ sameIsIncorrectlyUsed: true }).length).toBe(0);

    const wrongRow = 0;
    const wrongCol = 0;

    const boardWithWrongValue = [...board.map(row => [...row])] as BoardType;

    boardWithWrongValue[wrongRow][wrongCol] = {
      type: 'wrong',
      value: 2
    };

    wrapper = shallow(
      <Board
        gameBoard={boardWithWrongValue}
        selectedTile={null}
        selectTile={selectTile}
      />
    );

    const rowCoords = boardWithWrongValue[wrongRow].map(
      (_, col) => `${wrongRow},${col}`
    );
    const colCoords = boardWithWrongValue.map((_, row) => `${row},${wrongCol}`);

    const topRow = Math.floor(wrongRow / 3) * 3;
    const leftCol = Math.floor(wrongCol / 3) * 3;
    const innerSquareCoords = boardWithWrongValue
      .slice(topRow, topRow + 3)
      .map((row, i) =>
        row
          .slice(leftCol, leftCol + 3)
          .map((col, j) => `${i + topRow},${j + leftCol}`)
      )
      .reduce((a, b) => a.concat(b));

    const sameContextCoords = new Set([
      ...rowCoords,
      ...colCoords,
      ...innerSquareCoords
    ]);
    sameContextCoords.delete(`${wrongRow},${wrongCol}`);

    const sameValCount = Array.from(sameContextCoords).reduce(
      (sameValCount, coords) => {
        const [row, col] = coords.split(',').map(s => parseInt(s));
        const { value } = boardWithWrongValue[row][col];

        return typeof value === 'number' &&
          value === boardWithWrongValue[wrongRow][wrongCol].value
          ? sameValCount + 1
          : sameValCount;
      },
      0
    );

    expect(wrapper.find({ sameIsIncorrectlyUsed: true }).length).toBe(
      sameValCount
    );

    boardWithWrongValue.forEach((row, i) => {
      row.forEach((col, j) => {
        expect(
          wrapper
            .childAt(i * boardWithWrongValue.length + j)
            .prop('sameIsIncorrectlyUsed')
        ).toBe(
          typeof boardWithWrongValue[i][j].value === 'number' &&
            !(i === wrongRow && j === wrongCol) &&
            (i === wrongRow ||
              j === wrongCol ||
              isInSameSquare(
                [i, j],
                [wrongRow, wrongCol],
                boardWithWrongValue
              )) &&
            boardWithWrongValue[i][j].value ===
              boardWithWrongValue[wrongRow][wrongCol].value
        );
      });
    });
  });
});
