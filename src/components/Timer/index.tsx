import React from 'react';
import { connect } from 'react-redux';
import './Timer.css';
import { State } from '../../redux';

interface Props {
  seconds: number;
}

const secondsToMinuteFormat = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = (totalSeconds % 60).toString();

  return `${minutes.length <= 2 ? ('0' + minutes).slice(-2) : minutes}:${(
    '0' + seconds
  ).slice(-2)}`;
};

export const Timer: React.FC<Props> = ({ seconds }) => {
  return <div className='timer'>{secondsToMinuteFormat(seconds)}</div>;
};

const mapStateToProps = ({ timer: { seconds } }: State) => ({ seconds });

export default connect(mapStateToProps)(Timer);
