export type TileNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TileValue = null | TileNumberType;

export interface ReadOnlyTile {
  type: 'readOnly';
  value: TileNumberType;
  animationDelay: null | number;
}

export interface BlankTile {
  type: 'blank';
  value: null;
  animationDelay: null;
}

export interface CorrectTile {
  type: 'correct';
  value: TileNumberType;
  animationDelay: null | number;
}

export interface WrongTile {
  type: 'wrong';
  value: TileNumberType;
  animationDelay: null;
}

export interface NotesTile {
  type: 'notes';
  value: Set<TileNumberType>;
  animationDelay: null;
}

export type TileType =
  | ReadOnlyTile
  | BlankTile
  | CorrectTile
  | WrongTile
  | NotesTile;

export type Row = TileType[];

export type BoardType = Row[];

export type Coords = [number, number];
