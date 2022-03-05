import React from 'react';
import {
  withGameIO,
  renderLoop,
  FPS,
  pressLeft,
  pressRight,
  pressSoftDrop,
  pressRotateLeft,
  pressRotateRight,
  pressHardDrop,
} from '~app/lib/wasm';
import styles from './main.module.scss';

export const PlayfieldCanvas = () => {
  React.useEffect(() => {
    if (!document) {
      return;
    }

    const _canvas = document.getElementById('___canvas') as HTMLCanvasElement;
    if (!_canvas) {
      return;
    }

    const _ctx = _canvas.getContext('2d');
    if (!_ctx) {
      return;
    }

    const render = () => {
      withGameIO((game) => {
        renderLoop({ ctx: _ctx, game });
      });
    };

    setInterval(render, FPS);
  }, []);

  React.useEffect(() => {
    if (!window) {
      return;
    }

    const keydown = (ev: KeyboardEvent) => {
      withGameIO((game) => {
        if (ev.code === 'KeyA') pressLeft({ game });
        if (ev.code === 'KeyD') pressRight({ game });
        if (ev.code === 'KeyS') pressSoftDrop({ game });
        if (ev.code === 'KeyJ') pressRotateLeft({ game });
        if (ev.code === 'KeyK') pressRotateRight({ game });
        if (ev.code === 'Space') pressHardDrop({ game });
      });
    };

    window.addEventListener('keydown', keydown);

    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <canvas id="___canvas" className={styles.canvas} width={205} height={393} />
  );
};
