import React from 'react';
import { connect } from 'react-redux';
import './PausePlayButton.css';
import { State } from '../../redux';
import { IoIosPause } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import classnames from 'classnames';
import { togglePause } from '../../redux/ducks/board';

interface Props {
  isPaused: boolean;
  togglePause: () => void;
}

export const PausePlayButton: React.FC<Props> = ({ isPaused, togglePause }) => {
  const buttonClasses = classnames('pause-play-button', {
    'pause-play-button--paused': isPaused
  });

  return (
    <button className={buttonClasses} onClick={() => togglePause()}>
      {isPaused ? <IoIosPause /> : <FaPlay />}
    </button>
  );
};

const mapStateToProps = ({ board: { isPaused } }: State) => ({ isPaused });

export default connect(mapStateToProps, { togglePause })(PausePlayButton);
