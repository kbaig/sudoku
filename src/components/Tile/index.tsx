import React from 'react';
import classnames from 'classnames';
import './Tile.css';
import { TileNumberType } from '../../types/gameBoard';

interface Props {
  isSelected?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
  type: 'readOnly' | 'blank' | 'correct' | 'notes';
  children?: TileNumberType | null | Set<TileNumberType>;
}

const Tile: React.FC<Props> = ({
  type,
  isSelected,
  isHighlighted,
  onClick,
  children
}) => {
  const tileClassNames = classnames('tile', {
    'tile--read-only': type === 'readOnly',
    'tile--correct': type === 'correct',
    'tile--notes': type === 'notes',
    'tile--selected': isSelected,
    'tile--highlighted': isHighlighted
  });

  return (
    <div className={tileClassNames} onClick={onClick}>
      {children instanceof Set
        ? Array.from(children as Set<TileNumberType>)
            .sort((a, b) => a - b)
            .map(n => (
              <div
                key={n}
                className='note'
                style={{
                  gridColumnStart: n % 3 || 3,
                  gridRowStart: Math.ceil(n / 3)
                }}
              >
                {n}
              </div>
            ))
        : children}
    </div>
  );
};

export default Tile;
