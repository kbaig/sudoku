import {
  isWinnable,
  isFull,
  findEmptyTile,
  generateEmptyBoard,
  hasNoConflict
} from '../../util/generateBoard';

// example completed board:
// [
//   [4, 3, 5, 2, 6, 9, 7, 8, 1],
//   [6, 8, 2, 5, 7, 1, 4, 9, 3],
//   [1, 9, 7, 8, 3, 4, 5, 6, 2],
//   [8, 2, 6, 1, 9, 5, 3, 4, 7],
//   [3, 7, 4, 6, 8, 2, 9, 1, 5],
//   [9, 5, 1, 7, 4, 3, 6, 2, 8],
//   [5, 1, 9, 3, 2, 6, 8, 7, 4],
//   [2, 4, 8, 9, 5, 7, 1, 3, 6],
//   [7, 6, 3, 4, 1, 8, 2, 5, 9]
// ]

// example possible board:
// [
//   [null, 2, null, null, 4, null, 8, null, null],
//   [null, null, 3, null, null, 1, null, 5, null],
//   [8, 5, 1, 7, 2, 6, 3, 4, 9],
//   [null, null, 5, null, null, 9, 1, null, 2],
//   [2, 1, null, null, null, 8, null, 6, 4],
//   [null, null, null, null, 6, null, 5, 9, null],
//   [5, 6, 8, 9, 1, 3, 4, null, 7],
//   [3, 4, 2, 6, null, null, null, 1, null],
//   [1, 9, 7, null, null, null, 6, null, 3]
// ];

describe('isFull', () => {
  expect(
    isFull([
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9]
    ])
  ).toBe(true);

  expect(
    isFull([
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 9, null]
    ])
  ).toBe(false);

  expect(
    isFull([
      [null, 2, null, null, 4, null, 8, null, null],
      [null, null, 3, null, null, 1, null, 5, null],
      [8, 5, 1, 7, 2, 6, 3, 4, 9],
      [null, null, 5, null, null, 9, 1, null, 2],
      [2, 1, null, null, null, 8, null, 6, 4],
      [null, null, null, null, 6, null, 5, 9, null],
      [5, 6, 8, 9, 1, 3, 4, null, 7],
      [3, 4, 2, 6, null, null, null, 1, null],
      [1, 9, 7, null, null, null, 6, null, 3]
    ])
  ).toBe(false);
});

describe('findEmptyTile', () => {
  it('throws on a full board', () => {
    expect(() =>
      findEmptyTile([
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ])
    ).toThrow('No empty tiles');
  });

  it('finds empty tiles', () => {
    expect(
      findEmptyTile([
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 9, null]
      ])
    ).toEqual([8, 8]);

    expect(
      findEmptyTile([
        [null, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ])
    ).toEqual([0, 0]);
  });
});

describe('generateEmptyBoard', () => {
  expect(generateEmptyBoard().every(row => row.every(val => !val))).toBe(true);
});

describe('hasNoConflict', () => {
  expect(
    hasNoConflict(
      1,
      [0, 0],
      [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ]
    )
  ).toBe(false);

  expect(
    hasNoConflict(
      8,
      [0, 0],
      [
        [null, 3, 5, 2, 6, 9, 7, null, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [null, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ]
    )
  ).toBe(false);

  expect(
    hasNoConflict(
      4,
      [0, 0],
      [
        [null, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, null, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ]
    )
  ).toBe(true);

  expect(
    hasNoConflict(
      9,
      [3, 4],
      [
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, null, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ]
    )
  ).toBe(true);
});

describe('isWinnable', () => {
  it('treats a full board as winnable', () => {
    expect(
      isWinnable([
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, 9]
      ])
    ).toBe(true);
  });

  it('can figure out if a board with one missing is winnable', () => {
    expect(
      isWinnable([
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 5, null]
      ])
    ).toBe(true);

    expect(
      isWinnable([
        [4, 3, 5, 2, 6, 9, 7, 8, 1],
        [6, 8, 2, 5, 7, 1, 4, 9, 3],
        [1, 9, 7, 8, 3, 4, 5, 6, 2],
        [8, 2, 6, 1, 9, 5, 3, 4, 7],
        [3, 7, 4, 6, 8, 2, 9, 1, 5],
        [9, 5, 1, 7, 4, 3, 6, 2, 8],
        [5, 1, 9, 3, 2, 6, 8, 7, 4],
        [2, 4, 8, 9, 5, 7, 1, 3, 6],
        [7, 6, 3, 4, 1, 8, 2, 9, null]
      ])
    ).toBe(false);
  });

  it('can handle emptier boards', () => {
    expect(
      isWinnable([
        [null, 2, null, null, 4, null, 8, null, null],
        [null, null, 3, null, null, 1, null, 5, null],
        [8, 5, 1, 7, 2, 6, 3, 4, 9],
        [null, null, 5, null, null, 9, 1, null, 2],
        [2, 1, null, null, null, 8, null, 6, 4],
        [null, null, null, null, 6, null, 5, 9, null],
        [5, 6, 8, 9, 1, 3, 4, null, 7],
        [3, 4, 2, 6, null, null, null, 1, null],
        [1, 9, 7, null, null, null, 6, null, 3]
      ])
    ).toBe(true);

    expect(
      isWinnable([
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ])
    ).toBe(true);

    expect(
      isWinnable([
        [null, 2, null, null, 4, null, 8, null, null],
        [null, null, 3, null, null, 1, null, 5, null],
        [8, 5, 1, 7, 2, 6, 3, 4, 9],
        [null, null, 5, null, null, 9, 1, null, 2],
        [2, 1, null, null, null, 8, null, 6, 4],
        [null, null, null, null, 6, null, 5, 9, null],
        [5, 6, 8, 9, 1, 3, 4, null, 7],
        [3, 4, 2, 6, null, null, null, 1, null],
        [1, 9, 7, null, null, null, 6, 1, 3]
      ])
    ).toBe(false);
  });
});
