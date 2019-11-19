import React from 'react';
import { connect } from 'react-redux';
import Tile from '../Tile';
import './Board.css';
import { BoardType } from '../../types/gameBoard';
import { State, ActionType } from '../../redux';
import { Dispatch } from 'redux';
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
    selectedTile &&
    gameBoard[selectedTile[0]][selectedTile[1]] &&
    gameBoard[selectedTile[0]][selectedTile[1]].value;
  const valueIsNumber = typeof selectedValue === 'number';

  return (
    <div className='board'>
      {gameBoard.map((row, i) => (
        <React.Fragment key={i}>
          {row.map(({ type, value }, j) => (
            <Tile
              key={j}
              type={type}
              onClick={() => selectTile(i, j)}
              isSelected={
                !!selectedTile && selectedTile[0] === i && selectedTile[1] === j
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
            >
              {value}
            </Tile>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = ({ board: { gameBoard, selectedTile } }: State) => ({
  gameBoard,
  selectedTile
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  selectTile: (row: number, column: number) => dispatch(selectTile(row, column))
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
