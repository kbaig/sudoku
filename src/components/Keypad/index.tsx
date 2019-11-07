import React from 'react';
import Numkey from '../Numkey';
import { TileNumberType } from '../../types/gameBoard';

const keys: TileNumberType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Keypad: React.FC = () => {
  return (
    <div className='keypad'>
      {keys.map(n => (
        <Numkey key={n}>{n}</Numkey>
      ))}
    </div>
  );
};

export default Keypad;
