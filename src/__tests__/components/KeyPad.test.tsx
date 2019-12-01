import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Keypad from '../../components/Keypad';
import Numkey from '../../components/Numkey';
import EraseButton from '../../components/EraseButton';
import ToggleNotesButton from '../../components/ToggleNotesButton';
import HintButton from '../../components/HintButton';
import NewGameButton from '../../components/NewGameButton';
import UndoButton from '../../components/UndoButton';

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('<Keypad />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => (wrapper = shallow(<Keypad />)));

  it(`renders ${keys.length} <Numkey />s with correct values`, () => {
    expect(wrapper.find(Numkey).length).toBe(keys.length);

    wrapper.find('.numkey').forEach((numkey, i) => {
      expect(numkey.prop('children')).toEqual(keys[i]);
    });
  });

  it('renders a <ToggleNotesButton />', () => {
    expect(wrapper.find(ToggleNotesButton).length).toBe(1);
  });

  it('renders a <HintButton />', () => {
    expect(wrapper.find(HintButton).length).toBe(1);
  });

  it('renders a <EraseButton />', () => {
    expect(wrapper.find(EraseButton).length).toBe(1);
  });

  it('renders a <NewGameButton />', () => {
    expect(wrapper.find(NewGameButton).length).toBe(1);
  });

  it('renders a <UndoButton />', () => {
    expect(wrapper.find(UndoButton).length).toBe(1);
  });
});
