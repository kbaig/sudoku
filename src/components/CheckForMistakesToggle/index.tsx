import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './CheckForMistakesToggle.css';
import { State } from '../../redux';
import { toggleCheckForMistakes } from '../../redux/ducks/board';
import { FaCheck } from 'react-icons/fa';

interface Props {
  isInCheckForMistakesMode: boolean;
  toggleCheckForMistakes: () => void;
}

// TODO: Review accessibility guidelines for optimization
// TODO: Ensure checkbox value synced with isInCheckForMistakesMode
export const CheckForMistakesToggle: React.FC<Props> = ({
  isInCheckForMistakesMode,
  toggleCheckForMistakes
}) => {
  const labelClasses = classnames('check-for-mistakes-toggle', {
    'check-for-mistakes-toggle--enabled': isInCheckForMistakesMode
  });

  return (
    <label className={labelClasses}>
      <span className='check-for-mistakes-toggle__label-text'>
        Check for Mistakes
      </span>
      <div className='check-for-mistakes-toggle__switch'>
        <input
          type='checkbox'
          onChange={toggleCheckForMistakes}
          className='check-for-mistakes-toggle__checkbox'
        />
        <span className='check-for-mistakes-toggle__switch-pin'>
          <FaCheck />
        </span>
      </div>
    </label>
  );
};

const mapStateToProps = ({ board: { isInCheckForMistakesMode } }: State) => ({
  isInCheckForMistakesMode
});

export default connect(mapStateToProps, { toggleCheckForMistakes })(
  CheckForMistakesToggle
);
