import React from 'react';
import { toggleNotes } from '../../redux/ducks/board';
import { connect } from 'react-redux';
import './ToggleNotesButton.css';
import { State } from '../../redux';
import classnames from 'classnames';

interface Props {
  isInNotesMode: boolean;
  toggleNotes: () => void;
}

export const ToggleNotesButton: React.FC<Props> = ({
  isInNotesMode,
  toggleNotes
}) => {
  const modeStatusClasses = classnames('notes-button__mode-status', {
    'notes-button__mode-status--on': isInNotesMode
  });

  return (
    <button className='toggle-notes-button' onClick={() => toggleNotes()}>
      Notes
      <span className={modeStatusClasses}>{isInNotesMode ? 'ON' : 'OFF'}</span>
    </button>
  );
};

const mapStateToProps = ({ board: { isInNotesMode } }: State) => ({
  isInNotesMode
});

export default connect(mapStateToProps, { toggleNotes })(ToggleNotesButton);
