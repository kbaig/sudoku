import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Board } from '../../components/Board';
import Tile from '../../components/Tile';
import { generateMockBoard } from '../../util/generateMockBoard';
import PausedBoardOverlay from '../../components/PausedBoardOverlay';
import getBoardLength from '../../util/getBoardLength';
import isInSameSquare from '../../util/isInSameSquare';
import { getTileContext } from '../../util/getTileContext';

describe('<Board />', () => {
  let wrapper: ShallowWrapper;

  const board = generateMockBoard();
  const boardLength = getBoardLength(board);
  const selectTile = jest.fn();

  beforeEach(
    () =>
      (wrapper = shallow(
        <Board
          isPlaying
          currentBoard={board}
          selectedTile={null}
          selectTile={selectTile}
        />
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

  it('should correctly assign animationDelay prop to <Tile />s', () => {
    board.forEach((row, i) => {
      row.forEach(({ value }, j) => {
        const children = wrapper
          .childAt(i * board.length + j)
          .prop('animationDelay');
        expect(children).toBe(board[i][j].animationDelay);
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
      <Board
        isPlaying
        currentBoard={board}
        selectedTile={[0, 0]}
        selectTile={selectTile}
      />
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
        isPlaying
        currentBoard={board}
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
            isInSameSquare(board)([selectedRow, selectedCol])([i, j])
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
        isPlaying
        currentBoard={board}
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

    const boardWithWrongValue = [...board.map(row => [...row])];

    boardWithWrongValue[wrongRow][wrongCol] = {
      type: 'wrong',
      value: 2,
      animationDelay: null
    };

    wrapper = shallow(
      <Board
        isPlaying
        currentBoard={boardWithWrongValue}
        selectedTile={null}
        selectTile={selectTile}
      />
    );

    const sameContextCoords = getTileContext(boardWithWrongValue, [
      wrongRow,
      wrongCol
    ]);

    const sameValCount = sameContextCoords.reduce(
      (sameValCount, [row, col]) => {
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
              isInSameSquare(boardWithWrongValue)([wrongRow, wrongCol])([
                i,
                j
              ])) &&
            boardWithWrongValue[i][j].value ===
              boardWithWrongValue[wrongRow][wrongCol].value
        );
      });
    });
  });

  it('renders a <PausedBoardOverlay /> if the game is paused', () => {
    expect(wrapper.find(PausedBoardOverlay).length).toBe(0);

    wrapper = shallow(
      <Board
        isPlaying={false}
        currentBoard={board}
        selectedTile={null}
        selectTile={selectTile}
      />
    );

    expect(wrapper.find(PausedBoardOverlay).length).toBe(1);
  });

  it('hides all tiles when game is paused', () => {
    wrapper = shallow(
      <Board
        isPlaying={false}
        currentBoard={board}
        selectedTile={null}
        selectTile={selectTile}
      />
    );

    board.forEach((row, i) => {
      row.forEach((col, j) => {
        expect(wrapper.childAt(i * board.length + j).prop('type')).toBe(
          'blank'
        );
      });
    });
  });
});
