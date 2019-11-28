import React from 'react';
import { connect } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import { resumeGame } from '../../redux/ducks/timer';
import './PausedBoardOverlay.css';

interface Props {
  resumeGame: () => void;
}

export const PausedBoardOverlay: React.FC<Props> = ({ resumeGame }) => {
  return (
    <button className='paused-board-overlay' onClick={resumeGame}>
      <div className='paused-board-overlay__icon'>
        <FaPlay />
      </div>
    </button>
  );
};

export default connect(null, { resumeGame })(PausedBoardOverlay);
