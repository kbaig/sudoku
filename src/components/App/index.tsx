import React from 'react';
import './App.css';
import Board from '../Board';
import Keypad from '../Keypad';
import PausePlayButton from '../PausePlayButton';

const App: React.FC = () => {
  return (
    <div className='app'>
      <div className='top-row'>
        <div />
        <div />
        <div>
          <PausePlayButton />
        </div>
      </div>
      <Board />
      <Keypad />
    </div>
  );
};

export default App;
