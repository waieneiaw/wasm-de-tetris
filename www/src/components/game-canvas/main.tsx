import React from 'react';
import {
  CANVAS,
  withGameIO,
  renderLoop,
  FPS,
  handleKeyDown,
  handleKeyUp,
  useWASMLoader,
} from '~app/lib/wasm';
import styles from './main.module.scss';

const _LAYER_ID = {
  MAIN: '___canvas_main',
  SCREEN: '___canvas_screen',
} as const;

export const GameCanvas = () => {
  useWASMLoader();

  React.useEffect(() => {
    if (!document) {
      return;
    }

    const mainLayer = document.getElementById(
      _LAYER_ID.MAIN,
    ) as HTMLCanvasElement;
    if (!mainLayer) {
      return;
    }

    const ctxMainLayer = mainLayer.getContext('2d');
    if (!ctxMainLayer) {
      return;
    }

    const fontLayer = document.getElementById(
      _LAYER_ID.SCREEN,
    ) as HTMLCanvasElement;
    if (!fontLayer) {
      return;
    }

    const ctxScreenLayer = mainLayer.getContext('2d');
    if (!ctxScreenLayer) {
      return;
    }

    const render = () => {
      withGameIO((game) => {
        renderLoop({
          game,
          ctxMainLayer,
          ctxScreenLayer,
        });
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
    <div className={styles.root}>
      <div className={styles.container}>
        <canvas
          id={_LAYER_ID.MAIN}
          className={styles.canvas}
          width={CANVAS.WIDTH}
          height={CANVAS.HEIGHT}
        />
        <canvas
          id={_LAYER_ID.SCREEN}
          className={styles.canvas}
          width={CANVAS.WIDTH}
          height={CANVAS.HEIGHT}
        />
      </div>
    </div>
  );
};
