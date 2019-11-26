import React from 'react';
import { toggleNotes } from '../../redux/ducks/board';
import { connect } from 'react-redux';
import './ToggleNotesButton.css';

interface Props {
  toggleNotes: () => void;
}

export const ToggleNotesButton: React.FC<Props> = ({ toggleNotes }) => {
  return (
    <button className='toggle-notes-button' onClick={() => toggleNotes()}>
      Toggle Notes
    </button>
  );
};

export default connect(null, { toggleNotes })(ToggleNotesButton);
