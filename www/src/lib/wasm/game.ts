import { GameIO, Cell } from '~app/@wasm/wasm';
import { memory } from '~app/@wasm/wasm_bg.wasm';
import { CANVAS, FONT, COLOR, CELL_SIZE } from './constants';
import { updateKeyState } from './input';

const _getIndex = (game: GameIO, row: number, col: number) =>
  game.get_index(row, col);

const _drawGrid = (args: {
  game: GameIO;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
}) => {
  args.ctx.beginPath();
  args.ctx.strokeStyle = COLOR.GRID;

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

const _drawCells = (args: {
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
      const idx = _getIndex(args.game, row, col);
      if (isGameover) {
        switch (cells[idx]) {
          case Cell.Empty: {
            args.ctx.fillStyle = COLOR.EMPTY;
            break;
          }
          default: {
            args.ctx.fillStyle = COLOR.FILLER;
            break;
          }
        }
      } else {
        switch (cells[idx]) {
          case Cell.Filler: {
            args.ctx.fillStyle = COLOR.FILLER;
            break;
          }
          case Cell.IMino: {
            args.ctx.fillStyle = COLOR.I;
            break;
          }
          case Cell.JMino: {
            args.ctx.fillStyle = COLOR.J;
            break;
          }
          case Cell.LMino: {
            args.ctx.fillStyle = COLOR.L;
            break;
          }
          case Cell.OMino: {
            args.ctx.fillStyle = COLOR.O;
            break;
          }
          case Cell.SMino: {
            args.ctx.fillStyle = COLOR.S;
            break;
          }
          case Cell.TMino: {
            args.ctx.fillStyle = COLOR.T;
            break;
          }
          case Cell.ZMino: {
            args.ctx.fillStyle = COLOR.Z;
            break;
          }
          default: {
            args.ctx.fillStyle = COLOR.EMPTY;
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

const _drawStartupScreen = (args: {
  ctx: CanvasRenderingContext2D;
  game: GameIO;
}) => {
  if (!args.game.is_startup()) {
    return;
  }
  args.ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  args.ctx.beginPath();
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  args.ctx.fillStyle = 'rgba(' + [0, 0, 0, 0] + ')';
  args.ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  const fontSize = FONT.SMALL_SIZE;

  const x1 = CANVAS.WIDTH / 2 - (fontSize * 3) / 2;
  const x2 = CANVAS.WIDTH / 2 - (fontSize * 7) / 2;
  const y = CANVAS.HEIGHT / 2;

  args.ctx.font = FONT.STYLE(fontSize);
  args.ctx.fillStyle = COLOR.FONT;
  args.ctx.fillText('HIT', x1, y);
  args.ctx.fillText('ANY KEY', x2, y + FONT.LINE_HEIGHT);
};

const _drawPauseScreen = (args: {
  ctx: CanvasRenderingContext2D;
  game: GameIO;
}) => {
  if (!args.game.is_pause()) {
    return;
  }

  args.ctx.beginPath();
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  args.ctx.fillStyle = 'rgba(' + [0, 0, 0, 0.5] + ')';
  args.ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  const fontSize = FONT.SIZE;

  const x = CANVAS.WIDTH / 2 - (fontSize * 5) / 2;
  const y = CANVAS.HEIGHT / 2;

  args.ctx.font = FONT.STYLE(fontSize);
  args.ctx.fillStyle = COLOR.FONT;
  args.ctx.fillText('PAUSE', x, y);
};

const _drawGameOverScreen = (args: {
  ctx: CanvasRenderingContext2D;
  game: GameIO;
}) => {
  if (!args.game.is_gameover()) {
    return;
  }

  const fontSize = FONT.SIZE;

  const x = CANVAS.WIDTH / 2 - (fontSize * 4) / 2;
  const y = CANVAS.HEIGHT / 2;

  args.ctx.font = FONT.STYLE(fontSize);
  args.ctx.fillStyle = COLOR.FONT;
  args.ctx.fillText('GAME', x, y);
  args.ctx.fillText('OVER', x, y + FONT.LINE_HEIGHT);
};

const _update = (args: { game: GameIO }) => {
  updateKeyState({ game: args.game });

  args.game.update();
};

const _draw = (args: {
  game: GameIO;
  ctxMainLayer: CanvasRenderingContext2D;
  ctxScreenLayer: CanvasRenderingContext2D;
}) => {
  _drawGrid({ game: args.game, ctx: args.ctxMainLayer, cellSize: CELL_SIZE });
  _drawCells({ game: args.game, ctx: args.ctxMainLayer, cellSize: CELL_SIZE });

  _drawStartupScreen({ game: args.game, ctx: args.ctxScreenLayer });
  _drawPauseScreen({ game: args.game, ctx: args.ctxScreenLayer });
  _drawGameOverScreen({ game: args.game, ctx: args.ctxScreenLayer });
};

export const renderLoop = (args: {
  game: GameIO;
  ctxMainLayer: CanvasRenderingContext2D;
  ctxScreenLayer: CanvasRenderingContext2D;
}) => {
  _update({ game: args.game });
  _draw(args);
};
