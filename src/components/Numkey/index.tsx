import React from 'react';
import { TileNumberType } from '../../types/gameBoard';
import { ActionType } from '../../redux';
import { Dispatch } from 'redux';
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

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  pressNumber: (num: TileNumberType) => dispatch(pressNumber(num))
});

export default connect(null, mapDispatchToProps)(Numkey);
