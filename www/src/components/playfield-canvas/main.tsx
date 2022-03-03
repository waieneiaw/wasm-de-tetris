import React from 'react';
import {
  withGameIO,
  renderLoop,
  FPS,
  pressLeft,
  pressRight,
} from '~app/lib/wasm';
import styles from './main.module.scss';

export const PlayfieldCanvas = () => {
  React.useEffect(() => {
    if (!document) {
      return;
    }

    const _wrapper = document.getElementById(
      '___canvasWrapper',
    ) as HTMLDivElement;
    if (!_wrapper) {
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

    // const resize = () => {
    //   _canvas.width = _wrapper.clientWidth;
    //   _canvas.height = _wrapper.clientHeight;
    // };

    const render = () => {
      // resize();
      withGameIO((game) => {
        renderLoop({ ctx: _ctx, game });
      });
    };

    setInterval(render, FPS);

    // return () => {
    //   cancelAnimationFrame()
    // }
  }, []);

  React.useEffect(() => {
    if (!window) {
      return;
    }

    const keydown = (ev: KeyboardEvent) => {
      withGameIO((game) => {
        if (ev.code === 'ArrowLeft') pressLeft({ game });
        if (ev.code === 'ArrowRight') pressRight({ game });
      });
    };

    window.addEventListener('keydown', keydown);

    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  return (
    <div id="___canvasWrapper" className={styles.wrapper}>
      <canvas
        id="___canvas"
        className={styles.canvas}
        width={205}
        height={800}
      />
    </div>
  );
};
