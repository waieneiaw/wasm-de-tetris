import * as React from 'react';
import * as WASM from '~app/@wasm/wasm';
import { GameIO } from '~app/@wasm/wasm';

type WASM = typeof WASM;

let wasm: WASM;
let gameIO: GameIO;

/**
 * `js-sys`やら`rand`クレートをWASMで利用するにはブラウザでの実行が前提のようで（当たり前か）、
 * 下記の方法ではどうしてもSSRビルド時にエラーが発生し、ビルドできない。
 * `useWASMLoader`経由でインポートを行うことで対処する。
 */
// void (async () => {
//   const _wasm = await import('~app/@wasm/wasm');
//   wasm = _wasm;

//   const { GameIO } = _wasm;
//   const game = GameIO.new();
//   gameIO = game;
// })();

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

export const useWASMLoader = () => {
  React.useEffect(() => {
    const load = async () => {
      const _wasm = await import('~app/@wasm/wasm');
      wasm = _wasm;

      const { GameIO } = _wasm;
      const game = GameIO.new();
      gameIO = game;
    };

    void load();
  }, []);
};
