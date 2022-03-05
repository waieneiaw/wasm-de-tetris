import React from 'react';
import {
  CANVAS,
  withGameIO,
  renderLoop,
  FPS,
  handleKeyDown,
  handleKeyUp,
} from '~app/lib/wasm';
import styles from './main.module.scss';

const _LAYER_ID = {
  MAIN: '___canvas_main',
  FONT: '___canvas_font',
} as const;

export const PlayfieldCanvas = () => {
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
      _LAYER_ID.FONT,
    ) as HTMLCanvasElement;
    if (!fontLayer) {
      return;
    }

    const ctxFontLayer = mainLayer.getContext('2d');
    if (!ctxFontLayer) {
      return;
    }

    const render = () => {
      withGameIO((game) => {
        renderLoop({
          game,
          ctxMainLayer,
          ctxFontLayer,
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
      <canvas
        id={_LAYER_ID.MAIN}
        className={styles.canvas}
        width={CANVAS.WIDTH}
        height={CANVAS.HEIGHT}
        data-main-layer
      />
      <canvas
        id={_LAYER_ID.FONT}
        className={styles.canvas}
        width={CANVAS.WIDTH}
        height={CANVAS.HEIGHT}
        data-font-layer
      />
    </div>
  );
};
