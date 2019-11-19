import React from 'react';
import './App.css';
import Board from '../Board';
import Keypad from '../Keypad';

const App: React.FC = () => {
  return (
    <div className='app'>
      <Board />
      <Keypad />
    </div>
  );
};

export default App;
