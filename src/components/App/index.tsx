import React from 'react';
import './App.css';
import Board from '../Board';
import Keypad from '../Keypad';
import PausePlayButton from '../PausePlayButton';
import Timer from '../Timer';
import CheckForMistakesToggle from '../CheckForMistakesToggle';

const App: React.FC = () => {
  return (
    <div className='app'>
      <div className='top-row'>
        <div>Difficulty: Easy</div>
        <CheckForMistakesToggle />
        <div className='timer-and-pause-button'>
          <Timer />
          <PausePlayButton />
        </div>
      </div>
      <Board />
      <Keypad />
    </div>
  );
};

export default App;
