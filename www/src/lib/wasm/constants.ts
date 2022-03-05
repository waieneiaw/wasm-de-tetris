export const CANVAS = {
  WIDTH: 205,
  HEIGHT: 393,
} as const;

export const FONT = {
  SMALL_SIZE: 18,
  SIZE: 36,
  STYLE: (size: number) => `${size}px "Press Start 2p"`,
} as const;

export const FPS = 1000 / 60;
