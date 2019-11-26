import React from 'react';
import Numkey from '../Numkey';
import { TileNumberType } from '../../types/gameBoard';
import EraseButton from '../EraseButton';
import ToggleNotesButton from '../ToggleNotesButton';
import './Keypad.css';
import HintButton from '../HintButton';

const keys: TileNumberType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Keypad: React.FC = () => {
  return (
    <div className='keypad'>
      {keys.map(n => (
        <Numkey key={n}>{n}</Numkey>
      ))}
      <ToggleNotesButton />
      <HintButton />
      <EraseButton />
    </div>
  );
};

export default Keypad;
