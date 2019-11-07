import React from 'react';
import './App.css';
import Board from '../Board';
import Keypad from '../Keypad';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Board />
      <Keypad />
    </div>
  );
};

export default App;
