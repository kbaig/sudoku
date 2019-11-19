export type TileNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TileValue = null | TileNumberType;

export interface ReadOnlyTile {
  type: 'readOnly';
  value: TileNumberType;
}

export interface BlankTile {
  type: 'blank';
  value: null;
}

export interface CorrectTile {
  type: 'correct';
  value: TileNumberType;
}

export interface WrongTile {
  type: 'wrong';
  value: TileNumberType;
}

export interface NotesTile {
  type: 'notes';
  value: Set<TileNumberType>;
}

export type TileType =
  | ReadOnlyTile
  | BlankTile
  | CorrectTile
  | WrongTile
  | NotesTile;

export type Row = [
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType
];

export type BoardType = [Row, Row, Row, Row, Row, Row, Row, Row, Row];
