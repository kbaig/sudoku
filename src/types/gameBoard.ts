export type TileNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TileType = null | TileNumberType;

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
