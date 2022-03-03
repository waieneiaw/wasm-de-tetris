import * as WASM from '~app/@wasm/wasm';
import { GameIO } from '~app/@wasm/wasm';

type WASM = typeof WASM;

let wasm: WASM;
let gameIO: GameIO;

void (async () => {
  const _wasm = await import('~app/@wasm/wasm');
  wasm = _wasm;

  const { GameIO } = _wasm;
  const game = GameIO.new();
  gameIO = game;
})();

export const withWASM = <T>(callback: (wasm: WASM) => T) => {
  if (!wasm) {
    return;
  }

  const result = callback(wasm);

  return result;
};

export const withGameIO = <T>(callback: (game: GameIO) => T) => {
  if (!gameIO) {
    return;
  }

  const result = callback(gameIO);

  return result;
};
