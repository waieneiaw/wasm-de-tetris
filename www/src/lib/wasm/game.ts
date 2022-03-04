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
  const cellsPtr = args.game.view_data_ptr();
  const width = args.game.width();
  const height = args.game.height();

  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  args.ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(args.game, row, col);
      switch (cells[idx]) {
        case Cell.Wall: {
          args.ctx.fillStyle = ALIVE_COLOR;
          break;
        }
        case Cell.I: {
          args.ctx.fillStyle = '#00F0F0';
          break;
        }
        case Cell.J: {
          args.ctx.fillStyle = '#0000FF';
          break;
        }
        case Cell.L: {
          args.ctx.fillStyle = '#FF8800';
          break;
        }
        case Cell.O: {
          args.ctx.fillStyle = '#FFFF00';
          break;
        }
        case Cell.S: {
          args.ctx.fillStyle = '#88FF00';
          break;
        }
        case Cell.T: {
          args.ctx.fillStyle = '#FF00FF';
          break;
        }
        case Cell.Z: {
          args.ctx.fillStyle = '#FF0000';
          break;
        }
        default: {
          args.ctx.fillStyle = GRID_COLOR;
          break;
        }
      }

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
