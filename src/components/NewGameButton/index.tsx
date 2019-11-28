import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { startNewGame, restartGame } from '../../redux/ducks/board';
import './NewGameButton.css';

interface Props {
  startNewGame: () => void;
  restartGame: () => void;
}

export const NewGameButton: React.FC<Props> = ({
  startNewGame,
  restartGame
}) => {
  const [show, setShow] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  const showTooltip = () => {
    setIsExiting(false);
    setShow(true);
  };

  const hideTooltip = () => {
    setIsExiting(true);
    // ensure timeout is same as animation duration
    setTimeout(() => setShow(false), 200);
  };

  const tooltipContainerClasses = classnames(
    'new-game-button__tooltip-container',
    {
      'new-game-button__tooltip-container--exiting': isExiting
    }
  );

  return (
    <div className='new-game-button'>
      <button
        className='new-game-button__tooltip-button'
        onClick={show ? hideTooltip : showTooltip}
      >
        New Game
      </button>
      {show && (
        <div className={tooltipContainerClasses}>
          <div className='new-game-button__tooltip-arrow' />
          <div className='new-game-button__tooltip'>
            <div className='new-game-button__disclaimer'>
              Current game progress will be lost
            </div>
            <ul className='new-game-button__button-list'>
              <li>
                <button
                  className='new-game-button__list-item-button'
                  id='new-game'
                  onClick={() => {
                    hideTooltip();
                    startNewGame();
                  }}
                >
                  New Game
                </button>
              </li>
              <li>
                <button
                  className='new-game-button__list-item-button'
                  id='restart-game'
                  onClick={() => {
                    hideTooltip();
                    restartGame();
                  }}
                >
                  Restart
                </button>
              </li>
              <li>
                <button
                  className='new-game-button__list-item-button new-game-button__list-item-button--cancel'
                  onClick={hideTooltip}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, { startNewGame, restartGame })(NewGameButton);
