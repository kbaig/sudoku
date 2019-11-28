import React from 'react';
import { connect } from 'react-redux';
import './Timer.css';
import { State } from '../../redux';
import { incrementTime } from '../../redux/ducks/timer';

interface Props {
  seconds: number;
  isPlaying: boolean;
  incrementTime: () => void;
}

const secondsToMinuteFormat = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60).toString();
  const seconds = (totalSeconds % 60).toString();

  return `${minutes.length <= 2 ? ('0' + minutes).slice(-2) : minutes}:${(
    '0' + seconds
  ).slice(-2)}`;
};

export const Timer: React.FC<Props> = ({
  seconds,
  isPlaying,
  incrementTime
}) => {
  const [startTime, setStartTime] = React.useState(Date.now());
  const [priorProgress, setPriorProgress] = React.useState(0);
  const wasPlayingRef = React.useRef(isPlaying);

  // timer logic
  React.useEffect(() => {
    if (isPlaying) {
      // set start time as now (offset by prior progress) since the play button was just pressed
      if (!wasPlayingRef.current) {
        wasPlayingRef.current = true;
        setStartTime(Date.now() - priorProgress);
      }

      const interval = setInterval(() => {
        // increment time only if another second has passed since starting
        if (Date.now() - startTime >= 1000 * (seconds + 1)) {
          incrementTime();
        }
      }, 100);

      return () => clearInterval(interval);
    } else if (wasPlayingRef.current) {
      // just paused, remember how much progress into that last second we made
      wasPlayingRef.current = false;
      setPriorProgress(Date.now() - startTime);
    }
  }, [seconds, isPlaying, incrementTime, startTime, priorProgress]);

  return <div className='timer'>{secondsToMinuteFormat(seconds)}</div>;
};

const mapStateToProps = ({ timer: { seconds, isPlaying } }: State) => ({
  seconds,
  isPlaying
});

export default connect(mapStateToProps, { incrementTime })(Timer);
