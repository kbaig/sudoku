import React from 'react';
import classnames from 'classnames';
import './Tile.css';
import { TileType } from '../../types/gameBoard';

interface Props {
  children?: TileType;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

const Tile: React.FC<Props> = ({
  isSelected,
  isHighlighted,
  onClick,
  children
}) => {
  const tileClassNames = classnames('tile', {
    'tile--selected': isSelected,
    'tile--highlighted': isHighlighted
  });

  return (
    <div className={tileClassNames} onClick={onClick}>
      {children}
    </div>
  );
};

export default Tile;
