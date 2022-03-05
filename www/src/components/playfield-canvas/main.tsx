import React from 'react';
import {
  withGameIO,
  renderLoop,
  FPS,
  handleKeyDown,
  handleKeyUp,
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

    const keydownEvent = (ev: KeyboardEvent) => {
      handleKeyDown(ev.code);
    };

    const keyupEvent = (ev: KeyboardEvent) => {
      handleKeyUp(ev.code);
    };

    window.addEventListener('keydown', keydownEvent);
    window.addEventListener('keyup', keyupEvent);

    return () => {
      window.removeEventListener('keydown', keydownEvent);
      window.removeEventListener('keyup', keyupEvent);
    };
  }, []);

  return (
    <canvas id="___canvas" className={styles.canvas} width={205} height={393} />
  );
};
