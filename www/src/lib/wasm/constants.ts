export const CANVAS = {
  WIDTH: 205,
  HEIGHT: 392,
} as const;

export const FONT = {
  SMALL_SIZE: 18,
  SIZE: 36,
  LINE_HEIGHT: 40,
  STYLE: (size: number) => `${size}px "Press Start 2p"`,
} as const;

export const COLOR = {
  GRID: '#CCCCCC',
  EMPTY: '#DDDDDD',
  FILLER: '#000000',
  FONT: '#FFFFFF',

  I: '#00F0F0',
  J: '#0000FF',
  L: '#FF8800',
  O: '#FFFF00',
  S: '#88FF00',
  T: '#FF00FF',
  Z: '#FF0000',
} as const;

export const CELL_SIZE = 16; // px

export const FPS = 1000 / 60;
