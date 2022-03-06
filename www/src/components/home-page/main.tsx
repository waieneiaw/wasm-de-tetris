import React from 'react';
import Head from 'next/head';
import { GameCanvas } from '../game-canvas';
import styles from './main.module.scss';

export const HomePage = () => (
  <div className={styles.root}>
    <Head>
      <title>WASM-de-TETRIS</title>
      <meta name="description" content="WASM de TETRIS" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>WASM-de-TETRIS</header>

    <main className={styles.main}>
      <GameCanvas />
    </main>

    <footer className={styles.footer}>&copy; 2022 waien</footer>
  </div>
);
