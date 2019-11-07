import React from 'react';
import { connect } from 'react-redux';
import Tile from '../Tile';
import './Board.css';
import { BoardType } from '../../types/gameBoard';
import { State, ActionType } from '../../redux';
import { SelectedTile, selectTile } from '../../redux/ducks/selectedTile';
import { Dispatch } from 'redux';
import { isInSameSquare } from '../../util/board';

interface Props {
  board: BoardType;
  selectedTile: SelectedTile;
  selectTile: (row: number, col: number) => void;
}

export const Board: React.FC<Props> = ({ board, selectedTile, selectTile }) => {
  return (
    <div className='board'>
      {board.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((value, j) => (
            <Tile
              onClick={() => selectTile(i, j)}
              isSelected={
                !!selectedTile && selectedTile[0] === i && selectedTile[1] === j
              }
              isHighlighted={
                !!selectedTile &&
                (selectedTile[0] === i ||
                  selectedTile[1] === j ||
                  isInSameSquare([i, j], selectedTile, board))
              }
              key={j}
            >
              {value}
            </Tile>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = ({ board, selectedTile }: State) => ({
  board,
  selectedTile
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  selectTile: (row: number, column: number) => dispatch(selectTile(row, column))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
