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
  return (
    <div className='board'>
      {gameBoard.map((row, i) => (
        <React.Fragment key={i}>
          {/* ternary to help TS know isReadOnly beforehand */}
          {row.map(({ isReadOnly, value }, j) =>
            isReadOnly ? (
              <Tile
                isReadOnly={isReadOnly}
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
                key={j}
              >
                {value}
              </Tile>
            ) : (
              <Tile
                isReadOnly={isReadOnly}
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
                key={j}
              >
                {value}
              </Tile>
            )
          )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
