import { GameIO, Cell } from '~app/@wasm/wasm';
import { memory } from '~app/@wasm/wasm_bg.wasm';

const CELL_SIZE = 16; // px
const GRID_COLOR = '#CCCCCC';
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

const getIndex = (game: GameIO, row: number, col: number) =>
  game.get_index(row, col);
const getCurrent = (game: GameIO) => game.get_current();

const drawGrid = (args: {
  game: GameIO;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
}) => {
  args.ctx.beginPath();
  args.ctx.strokeStyle = GRID_COLOR;

  const width = args.game.width();
  const height = args.game.height();

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    args.ctx.moveTo(i * (args.cellSize + 1) + 1, 0);
    args.ctx.lineTo(
      i * (args.cellSize + 1) + 1,
      (args.cellSize + 1) * height + 1,
    );
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    args.ctx.moveTo(0, j * (args.cellSize + 1) + 1);
    args.ctx.lineTo(
      (args.cellSize + 1) * width + 1,
      j * (args.cellSize + 1) + 1,
    );
  }

  args.ctx.stroke();
};

const drawCells = (args: {
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  game: GameIO;
}) => {
  const cellsPtr = args.game.cells();
  const width = args.game.width();
  const height = args.game.height();

  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  args.ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(args.game, row, col);
      args.ctx.fillStyle = cells[idx] === Cell.Empty ? GRID_COLOR : ALIVE_COLOR;

      args.ctx.fillRect(
        col * (args.cellSize + 1) + 1,
        row * (args.cellSize + 1) + 1,
        args.cellSize,
        args.cellSize,
      );
    }

    args.ctx.stroke();
  }
};

export const FPS = 1000 / 60;

export const renderLoop = (args: {
  ctx: CanvasRenderingContext2D;
  game: GameIO;
}) => {
  args.game.update();

  drawGrid({ game: args.game, ctx: args.ctx, cellSize: CELL_SIZE });
  drawCells({ game: args.game, ctx: args.ctx, cellSize: CELL_SIZE });
  // drawTetrimino({ game: args.game, ctx: args.ctx, cellSize: CELL_SIZE });

  // requestAnimationFrame(() => renderLoop({ ctx: args.ctx }));
};

export const pressLeft = (args: { game: GameIO }) => {
  args.game.rotate_left();
};

export const pressRight = (args: { game: GameIO }) => {
  args.game.rotate_right();
};
