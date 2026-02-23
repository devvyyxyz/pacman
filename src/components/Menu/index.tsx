import React from 'react';
import styles from './Menu.module.css';
import { playChomp } from '../../utils/audio';

type Props = { onStart?: () => void, onOpenSettings?: ()=>void, onOpenCredits?: ()=>void, onError?: ()=>void };

export default function Menu({onStart, onOpenSettings, onOpenCredits, onError}: Props) {
  const [starting, setStarting] = React.useState(false);

  function handleStart() {
    if (starting) return;
    playChomp();
    setStarting(true);
    setTimeout(() => { if (onStart) onStart(); }, 600);
  }

  function handleSettings(){ playChomp(); if(onOpenSettings) onOpenSettings(); }
  function handleCredits(){ playChomp(); if(onOpenCredits) onOpenCredits(); }
  function handleError(){ if(onError) onError(); }

  return (
    <div className={`${styles.wrap} ${starting ? styles.starting : ''}`}>
      <div className={styles.bg} aria-hidden />
      <div className={styles.stage} role="main">
        <div className={styles.title}>
          <h1 className={styles.name}>PAC‑MOD</h1>
          <p className={styles.subtitle}>A polished indie reimagining of the classic arcade</p>
        </div>

        <div className={styles.controls} role="navigation" aria-label="Main menu">
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={handleStart}
            autoFocus
            aria-disabled={starting}
          >
            {starting ? 'Starting…' : 'Start Game'}
          </button>

          <div className={styles.row}>
            <button className={styles.btn} onClick={handleSettings}>Settings</button>
            <button className={styles.btn} onClick={handleCredits}>Credits</button>
            <button className={styles.btn} onClick={handleError}>Simulate Error</button>
          </div>
        </div>

        <div className={styles.footer}>Press Enter or click to start</div>
      </div>
    </div>
  );
}
