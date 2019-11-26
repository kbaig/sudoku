import React from 'react';
import { toggleNotes } from '../../redux/ducks/board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleNotes: () => dispatch(toggleNotes())
});

export default connect(null, mapDispatchToProps)(ToggleNotesButton);
