import {
  TileType,
  ReadOnlyTile,
  CorrectTile,
  BlankTile,
  WrongTile,
  NotesTile
} from '../types/gameBoard';

export function isReadOnlyTile(tile: TileType): tile is ReadOnlyTile {
  return tile.type === 'readOnly';
}

export function isBlankTile(tile: TileType): tile is BlankTile {
  return tile.type === 'blank';
}

export function isCorrectTile(tile: TileType): tile is CorrectTile {
  return tile.type === 'correct';
}

export function isWrongTile(tile: TileType): tile is WrongTile {
  return tile.type === 'wrong';
}

export function isNotesTile(tile: TileType): tile is NotesTile {
  return tile.type === 'notes';
}
