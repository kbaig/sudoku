import React from 'react';
import { connect } from 'react-redux';
import { FaUndoAlt } from 'react-icons/fa';
import { undo } from '../../redux/ducks/board';
import './UndoButton.css';

interface Props {
  undo: () => void;
}

export const UndoButton: React.FC<Props> = ({ undo }) => {
  return (
    <button className='undo-button' onClick={undo}>
      <FaUndoAlt />
      Undo
    </button>
  );
};

export default connect(null, { undo })(UndoButton);
