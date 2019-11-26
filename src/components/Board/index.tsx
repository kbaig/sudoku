import React from 'react';
import { connect } from 'react-redux';
import Tile from '../Tile';
import './Board.css';
import { BoardType } from '../../types/gameBoard';
import { State } from '../../redux';
import { isInSameSquare } from '../../util/board';
import { SelectedTile, selectTile } from '../../redux/ducks/board';

interface Props {
  gameBoard: BoardType;
  selectedTile: SelectedTile;
  selectTile: (row: number, col: number) => void;
}

export const Board: React.FC<Props> = ({
  gameBoard,
  selectedTile,
  selectTile
}) => {
  const selectedValue =
    selectedTile && gameBoard[selectedTile[0]][selectedTile[1]].value;
  const valueIsNumber = typeof selectedValue === 'number';

  return (
    <div className='board'>
      {gameBoard.map((row, i) => (
        <React.Fragment key={i}>
          {row.map(({ type, value, animationDelay }, j) => {
            const rowCoords = gameBoard[i].map((_, j) => `${i},${j}`);
            const colCoords = gameBoard.map((_, i) => `${i},${j}`);
            const topRow = Math.floor(i / 3) * 3;
            const leftCol = Math.floor(j / 3) * 3;
            const innerSquareCoords = gameBoard
              .slice(topRow, topRow + 3)
              .map((row, i) =>
                row
                  .slice(leftCol, leftCol + 3)
                  .map((_, j) => `${i + topRow},${j + leftCol}`)
              )
              .reduce((a, b) => a.concat(b));

            const sameContextCoords = new Set([
              ...rowCoords,
              ...colCoords,
              ...innerSquareCoords
            ]);
            sameContextCoords.delete(`${i},${j}`);

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
                    isInSameSquare([i, j], selectedTile, gameBoard))
                }
                sameIsSelected={
                  !!selectedTile &&
                  valueIsNumber &&
                  !(i === selectedTile[0] && j === selectedTile[1]) &&
                  value === selectedValue
                }
                sameIsIncorrectlyUsed={Array.from(sameContextCoords).some(
                  coords => {
                    const [row, col] = coords.split(',').map(s => parseInt(s));
                    const { type, value: wrongValue } = gameBoard[row][col];

                    return (
                      !(row === i && col === j) &&
                      type === 'wrong' &&
                      value === wrongValue
                    );
                  }
                )}
                animationDelay={animationDelay}
              >
                {value}
              </Tile>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = ({ board: { gameBoard, selectedTile } }: State) => ({
  gameBoard,
  selectedTile
});

export default connect(mapStateToProps, { selectTile })(Board);
