import React from 'react';
import { connect } from 'react-redux';
import { eraseTile } from '../../redux/ducks/board';
import './EraseButton.css';

interface Props {
  eraseTile: () => void;
}

export const EraseButton: React.FC<Props> = ({ eraseTile }) => {
  return (
    <button className='erase-button' onClick={() => eraseTile()}>
      Erase
    </button>
  );
};

export default connect(null, { eraseTile })(EraseButton);
