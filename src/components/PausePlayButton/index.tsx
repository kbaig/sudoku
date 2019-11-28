import React from 'react';
import { connect } from 'react-redux';
import './PausePlayButton.css';
import { State } from '../../redux';
import { IoIosPause } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import classnames from 'classnames';
import { togglePause } from '../../redux/ducks/timer';

interface Props {
  isPlaying: boolean;
  togglePause: () => void;
}

export const PausePlayButton: React.FC<Props> = ({
  isPlaying,
  togglePause
}) => {
  const buttonClasses = classnames('pause-play-button', {
    'pause-play-button--playing': isPlaying
  });

  return (
    <button className={buttonClasses} onClick={() => togglePause()}>
      {isPlaying ? <IoIosPause /> : <FaPlay />}
    </button>
  );
};

const mapStateToProps = ({ timer: { isPlaying } }: State) => ({ isPlaying });

export default connect(mapStateToProps, { togglePause })(PausePlayButton);
