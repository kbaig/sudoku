import React from 'react';
import { TileNumberType } from '../../types/gameBoard';
import { pressNumber } from '../../redux/ducks/board';
import { connect } from 'react-redux';
import './Numkey.css';

interface Props {
  children: TileNumberType;
  pressNumber: (num: TileNumberType) => void;
}

export const Numkey: React.FC<Props> = ({ pressNumber, children }) => {
  return (
    <button className='numkey' onClick={() => pressNumber(children)}>
      {children}
    </button>
  );
};

export default connect(null, { pressNumber })(Numkey);
