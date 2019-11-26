import React from 'react';
import { connect } from 'react-redux';
import { eraseTile } from '../../redux/ducks/board';
import './EraseButton.css';
import { FaEraser } from 'react-icons/fa';

interface Props {
  eraseTile: () => void;
}

export const EraseButton: React.FC<Props> = ({ eraseTile }) => {
  return (
    <button className='erase-button' onClick={() => eraseTile()}>
      <FaEraser />
      Erase
    </button>
  );
};

export default connect(null, { eraseTile })(EraseButton);
