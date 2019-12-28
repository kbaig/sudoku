import {
  BoardType,
  CorrectTile,
  NotesTile,
  TileValue,
  BlankTile,
  TileNumberType,
  WrongTile,
  Coords
} from '../types/gameBoard';

export function changeTileValue(
  tile: BlankTile | CorrectTile | WrongTile | NotesTile,
  value: TileValue,
  [row, col]: Coords,
  solvedBoard: BoardType,
  isInNotesMode: boolean
): BlankTile | CorrectTile | WrongTile | NotesTile {
  // return NotesTile if in notes mode
  if (isInNotesMode) {
    let newValue: Set<TileNumberType>;

    if (value && tile.type === 'notes') {
      newValue = new Set(tile.value);
      tile.value.has(value) ? newValue.delete(value) : newValue.add(value);
    } else if (value) {
      newValue = new Set([value]);
    } else {
      newValue = new Set();
    }

    return {
      ...tile,
      type: 'notes',
      value: newValue,
      animationDelay: null
    };
  } else if (!value) {
    // return BlankTile
    return {
      ...tile,
      type: 'blank',
      value,
      animationDelay: null
    };
  } else {
    // evaluate if value is correct or not
    return {
      ...tile,
      type: solvedBoard[row][col].value === value ? 'correct' : 'wrong',
      value,
      animationDelay: null
    };
  }
}
