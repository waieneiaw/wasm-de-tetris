import { GameIO, Cell } from '~app/@wasm/wasm';
import { memory } from '~app/@wasm/wasm_bg.wasm';
import { updateKeyState } from './key';

const CELL_SIZE = 16; // px
const GRID_COLOR = '#CCCCCC';
const FILLER_COLOR = '#000000';

const getIndex = (game: GameIO, row: number, col: number) =>
  game.get_index(row, col);

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
  const isGameover = args.game.is_gameover();

  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  args.ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(args.game, row, col);
      if (isGameover) {
        switch (cells[idx]) {
          case Cell.Empty: {
            args.ctx.fillStyle = GRID_COLOR;
            break;
          }
          default: {
            args.ctx.fillStyle = FILLER_COLOR;
            break;
          }
        }
      } else {
        switch (cells[idx]) {
          case Cell.Filler: {
            args.ctx.fillStyle = FILLER_COLOR;
            break;
          }
          case Cell.IMino: {
            args.ctx.fillStyle = '#00F0F0';
            break;
          }
          case Cell.JMino: {
            args.ctx.fillStyle = '#0000FF';
            break;
          }
          case Cell.LMino: {
            args.ctx.fillStyle = '#FF8800';
            break;
          }
          case Cell.OMino: {
            args.ctx.fillStyle = '#FFFF00';
            break;
          }
          case Cell.SMino: {
            args.ctx.fillStyle = '#88FF00';
            break;
          }
          case Cell.TMino: {
            args.ctx.fillStyle = '#FF00FF';
            break;
          }
          case Cell.ZMino: {
            args.ctx.fillStyle = '#FF0000';
            break;
          }
          default: {
            args.ctx.fillStyle = GRID_COLOR;
            break;
          }
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
  updateKeyState({ game: args.game });

  args.game.update();

  drawGrid({ game: args.game, ctx: args.ctx, cellSize: CELL_SIZE });
  drawCells({ game: args.game, ctx: args.ctx, cellSize: CELL_SIZE });
};
