import React from 'react';
import { toggleNoptes } from '../../redux/ducks/board';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface Props {
  toggleNotes: () => void;
}

export const ToggleNotesButton: React.FC<Props> = ({ toggleNotes }) => {
  return (
    <button className='toggle-notes' onClick={() => toggleNotes()}>
      Toggle Notes
    </button>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleNotes: () => dispatch(toggleNoptes())
});

export default connect(
  null,
  mapDispatchToProps
)(ToggleNotesButton);
