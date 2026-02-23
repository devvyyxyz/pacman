import React from 'react';
import styles from './Menu.module.css';

type Props = {
  onStart?: () => void;
};

export default function Menu({onStart}: Props) {
  const [starting, setStarting] = React.useState(false);

  function handleStart() {
    if (starting) return;
    setStarting(true);
    // match CSS transition duration (600ms) then navigate
    setTimeout(() => {
      if (onStart) onStart();
    }, 600);
  }

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
        </div>

        <div className={styles.footer}>Press Enter or click to start</div>
      </div>
    </div>
  );
}
