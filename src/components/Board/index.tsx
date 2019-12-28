import React from 'react';
import { connect } from 'react-redux';
import Tile from '../Tile';
import './Board.css';
import { BoardType } from '../../types/gameBoard';
import { State } from '../../redux';
import { SelectedTile, selectTile } from '../../redux/ducks/board';
import PausedBoardOverlay from '../PausedBoardOverlay';
import { isInSameSquare } from '../../util/isInSameSquare';
import { getTileContext } from '../../util/getTileContext';

interface Props {
  currentBoard: BoardType;
  isPlaying: boolean;
  selectedTile: SelectedTile;
  selectTile: (row: number, col: number) => void;
}

export const Board: React.FC<Props> = ({
  currentBoard,
  isPlaying,
  selectedTile,
  selectTile
}) => {
  const selectedValue =
    selectedTile && currentBoard[selectedTile[0]][selectedTile[1]].value;
  const valueIsNumber = typeof selectedValue === 'number';

  return isPlaying ? (
    <div className='board'>
      {currentBoard.map((row, i) => (
        <React.Fragment key={i}>
          {row.map(({ type, value, animationDelay }, j) => {
            const sameContextCoords = getTileContext(currentBoard, [i, j]);

            return (
              <Tile
                key={`${i},${j},${animationDelay}`}
                type={type}
                onClick={() => selectTile(i, j)}
                isSelected={
                  !!selectedTile &&
                  selectedTile[0] === i &&
                  selectedTile[1] === j
                }
                isHighlighted={
                  !!selectedTile &&
                  (selectedTile[0] === i ||
                    selectedTile[1] === j ||
                    isInSameSquare(currentBoard, selectedTile, [i, j]))
                }
                sameIsSelected={
                  !!selectedTile &&
                  valueIsNumber &&
                  !(i === selectedTile[0] && j === selectedTile[1]) &&
                  value === selectedValue
                }
                sameIsIncorrectlyUsed={sameContextCoords.some(([row, col]) => {
                  const { type, value: wrongValue } = currentBoard[row][col];

                  return (
                    !(row === i && col === j) &&
                    type === 'wrong' &&
                    value === wrongValue
                  );
                })}
                animationDelay={animationDelay}
              >
                {value}
              </Tile>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div className='board'>
      {currentBoard.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((_, j) => (
            <Tile
              key={`${i},${j}`}
              type='blank'
              onClick={() => {}}
              isSelected={false}
              isHighlighted={false}
              sameIsSelected={false}
              sameIsIncorrectlyUsed={false}
              animationDelay={null}
            >
              {null}
            </Tile>
          ))}
        </React.Fragment>
      ))}
      <PausedBoardOverlay />
    </div>
  );
};

const mapStateToProps = ({
  board: { currentBoard, selectedTile },
  timer: { isPlaying }
}: State) => ({
  currentBoard,
  selectedTile,
  isPlaying
});

export default connect(mapStateToProps, { selectTile })(Board);
