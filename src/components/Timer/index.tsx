import React from 'react';
import { connect } from 'react-redux';
import './Timer.css';
import { State } from '../../redux';

interface Props {
  time: number;
}

const secondsToMinuteFormat = (time: number): string => {
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();

  return `${minutes.length <= 2 ? ('0' + minutes).slice(-2) : minutes}:${(
    '0' + seconds
  ).slice(-2)}`;
};

export const Timer: React.FC<Props> = ({ time }) => {
  return <div className='timer'>{secondsToMinuteFormat(time)}</div>;
};

const mapStateToProps = ({ time }: State) => ({ time });

export default connect(mapStateToProps)(Timer);
