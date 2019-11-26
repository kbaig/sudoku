import React from 'react';
import { connect } from 'react-redux';
import { getHint } from '../../redux/ducks/board';
import { GoLightBulb } from 'react-icons/go';

import './HintButton.css';

interface Props {
  getHint: () => void;
}

export const HintButton: React.FC<Props> = ({ getHint }) => {
  return (
    <button className='hint-button' onClick={getHint}>
      <GoLightBulb />
      Hint
    </button>
  );
};

export default connect(null, { getHint })(HintButton);
