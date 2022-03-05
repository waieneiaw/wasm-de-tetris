import { GameIO } from '~app/@wasm/wasm';

/**
 * キーの押しっぱなしによる挙動の種類を定義する。
 * - `ACCEL`：入力直後に少し停止し、その後、少しスムーズに入力処理を実行する
 * - `SMOOTH`：入力直後から無停止で処理を実行する
 * - `NEVER`：押しっぱなしによる挙動を禁止する
 */
type HoldKeyBehavior = 'ACCEL' | 'SMOOTH' | 'NEVER';

type KeyStateValue = {
  /**
   * キーの入力を計測するカウンタ。
   */
  frame: number;
  /**
   * 入力中かどうか。
   */
  isInputed: boolean;
  /**
   * 押しっぱなしの挙動。
   */
  holdBehavior: HoldKeyBehavior;
};

type State = {
  moveLeft: KeyStateValue;
  moveRight: KeyStateValue;
  rotateLeft: KeyStateValue;
  rotateRight: KeyStateValue;
  softDrop: KeyStateValue;
  hardDrop: KeyStateValue;
  togglePause: KeyStateValue;
  anyKeys: KeyStateValue;
};

const _initialValue: State = {
  moveLeft: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'ACCEL',
  },
  moveRight: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'ACCEL',
  },
  rotateLeft: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'NEVER',
  },
  rotateRight: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'NEVER',
  },
  softDrop: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'SMOOTH',
  },
  hardDrop: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'NEVER',
  },
  togglePause: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'NEVER',
  },
  anyKeys: {
    frame: 0,
    isInputed: false,
    holdBehavior: 'NEVER',
  },
};

const _keyState = { ..._initialValue };

const _handleKeyInput = (
  key: keyof State,
  callback: (...args: unknown[]) => void,
) => {
  const holdType = _keyState[key].holdBehavior;

  if (!_keyState[key].isInputed) {
    return;
  }

  switch (holdType) {
    case 'ACCEL': {
      if (
        _keyState[key].frame === 0 ||
        (_keyState[key].frame > 10 && _keyState[key].frame % 5 === 0)
      ) {
        callback();
      }
      break;
    }

    case 'NEVER': {
      if (_keyState[key].frame === 0) {
        callback();
      }
      break;
    }

    default: {
      callback();
      break;
    }
  }

  _keyState[key].frame += 1;
};

export const updateKeyState = (args: { game: GameIO }) => {
  _handleKeyInput('moveLeft', () => args.game.move_left());
  _handleKeyInput('moveRight', () => args.game.move_right());
  _handleKeyInput('softDrop', () => args.game.soft_drop());
  _handleKeyInput('rotateLeft', () => args.game.rotate_left());
  _handleKeyInput('rotateRight', () => args.game.rotate_right());
  _handleKeyInput('hardDrop', () => args.game.hard_drop());
  _handleKeyInput('togglePause', () => args.game.toggle_pause());

  if (args.game.is_startup()) {
    _handleKeyInput('anyKeys', () => args.game.run());
  }
  // if (args.game.is_gameover()) {
  //   _handleKeyInput('anyKeys', () => () => args.game.restart());
  // }
};

export const handleKeyDown = (keyCode: string) => {
  if (keyCode === 'KeyA') _keyState.moveLeft.isInputed = true;
  if (keyCode === 'KeyD') _keyState.moveRight.isInputed = true;
  if (keyCode === 'KeyS') _keyState.softDrop.isInputed = true;
  if (keyCode === 'KeyJ') _keyState.rotateLeft.isInputed = true;
  if (keyCode === 'KeyK') _keyState.rotateRight.isInputed = true;
  if (keyCode === 'Space') _keyState.hardDrop.isInputed = true;
  if (keyCode === 'Escape') _keyState.togglePause.isInputed = true;

  _keyState.anyKeys.isInputed = true;
};

const clearKeyState = (key: keyof State) => {
  _keyState[key].frame = 0;
  _keyState[key].isInputed = false;
};

export const handleKeyUp = (keyCode: string) => {
  if (keyCode === 'KeyA') clearKeyState('moveLeft');
  if (keyCode === 'KeyD') clearKeyState('moveRight');
  if (keyCode === 'KeyS') clearKeyState('softDrop');
  if (keyCode === 'KeyJ') clearKeyState('rotateLeft');
  if (keyCode === 'KeyK') clearKeyState('rotateRight');
  if (keyCode === 'Space') clearKeyState('hardDrop');
  if (keyCode === 'Escape') clearKeyState('togglePause');

  clearKeyState('anyKeys');
};
