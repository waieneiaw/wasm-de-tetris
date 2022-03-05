import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PlayfieldCanvas } from '../playfield-canvas';
import styles from './main.module.scss';

export const HomePage: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>WASM-de-TETRIS</title>
        <meta name="description" content="WASM de TETRIS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>header</header>

      <main className={styles.main}>
        <PlayfieldCanvas />
      </main>

      <footer className={styles.footer}>footer</footer>
    </div>
  );
};
