import React from 'react';
import classnames from 'classnames';
import './Tile.css';
import { TileValue, TileNumberType } from '../../types/gameBoard';

interface BaseProps {
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

interface ReadOnlyProps extends BaseProps {
  type: 'readOnly';
  children: TileValue;
}

interface BlankProps extends BaseProps {
  type: 'blank';
  children?: null;
}

interface CorrectProps extends BaseProps {
  type: 'correct';
  children: TileNumberType;
}

interface NotesProps extends BaseProps {
  type: 'notes';
  children: Set<TileNumberType>;
}

type Props = ReadOnlyProps | BlankProps | CorrectProps | NotesProps;

const Tile: React.FC<Props> = ({
  type,
  isSelected,
  isHighlighted,
  onClick,
  children
}) => {
  const tileClassNames = classnames('tile', {
    'tile--read-only': type === 'readOnly',
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
