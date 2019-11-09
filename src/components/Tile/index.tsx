import React from 'react';
import classnames from 'classnames';
import './Tile.css';
import { TileValue } from '../../types/gameBoard';

interface BaseProps {
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

interface ReadOnlyProps extends BaseProps {
  isReadOnly: true;
  children: TileValue;
}

interface EditableProps extends BaseProps {
  isReadOnly?: false;
  children?: TileValue;
}

type Props = ReadOnlyProps | EditableProps;

const Tile: React.FC<Props> = ({
  isReadOnly,
  isSelected,
  isHighlighted,
  onClick,
  children
}) => {
  const tileClassNames = classnames('tile', {
    'tile--read-only': isReadOnly,
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
