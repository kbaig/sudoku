export type TileNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TileValue = null | TileNumberType;

interface ReadOnlyTile {
  isReadOnly: true;
  value: TileNumberType;
}

interface EditableTile {
  isReadOnly: false;
  value: TileValue;
}

export type TileType = ReadOnlyTile | EditableTile;

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
