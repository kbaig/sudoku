import React from 'react';
import classnames from 'classnames';
import './Tile.css';
import { TileNumberType } from '../../types/gameBoard';

interface Props {
  isSelected?: boolean;
  isHighlighted?: boolean;
  sameIsSelected?: boolean;
  sameIsIncorrectlyUsed?: boolean;
  animationDelay?: null | number;
  onClick: () => void;
  type: 'readOnly' | 'blank' | 'correct' | 'wrong' | 'notes';
  children?: TileNumberType | null | Set<TileNumberType>;
}

const Tile: React.FC<Props> = ({
  type,
  isSelected,
  isHighlighted,
  sameIsSelected,
  sameIsIncorrectlyUsed,
  animationDelay,
  onClick,
  children
}) => {
  const tileClassNames = classnames('tile', {
    'tile--read-only': type === 'readOnly',
    'tile--correct': type === 'correct',
    'tile--wrong': type === 'wrong',
    'tile--notes': type === 'notes',
    'tile--selected': isSelected,
    'tile--highlighted': isHighlighted,
    'tile--same-selected': sameIsSelected,
    'tile--same-incorrectly-used': sameIsIncorrectlyUsed,
    'tile--animate': !!animationDelay
  });

  return (
    <div
      className={tileClassNames}
      onClick={onClick}
      style={{
        animationDelay: `${animationDelay}ms`
      }}
    >
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
