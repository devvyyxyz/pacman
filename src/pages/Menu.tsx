import React from 'react';
import styles from './Menu.module.css';

type Props = {
  onStart?: () => void;
};

export default function Menu({onStart}: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bg} aria-hidden />

      {/* Faint maze outline, no border */}
      <svg className={styles.maze} viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect x="20" y="20" width="760" height="410" rx="12" ry="12" strokeWidth="0" stroke="none" fill="none" />
        <g stroke="#ffd84d" opacity="0.04" strokeWidth="1">
          <path d="M120 80h560M120 120h220M460 120h220M120 160h560M120 200h160M320 200h480M120 240h560M120 280h220M460 280h220M120 320h560" />
        </g>
      </svg>

      {/* Particles for subtle life */}
      <div className={styles.particles} aria-hidden>
        <div className={styles.particle} style={{left:'12%',top:'70%',animationDelay:'0s'}} />
        <div className={styles.particle} style={{left:'28%',top:'75%',animationDelay:'1.4s'}} />
        <div className={styles.particle} style={{left:'54%',top:'80%',animationDelay:'2.6s'}} />
        <div className={styles.particle} style={{left:'78%',top:'72%',animationDelay:'3.2s'}} />
      </div>

      <div className={styles.stage} role="main">
        <div className={styles.title}>
          <h1 className={styles.name}>PAC‑MOD</h1>
          <p className={styles.subtitle}>A polished indie reimagining of the classic arcade</p>
        </div>

        <div className={styles.controls} role="navigation" aria-label="Main menu">
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={() => (onStart ? onStart() : console.log('start'))}
            autoFocus
          >
            Start Game
          </button>
        </div>

        <div className={styles.footer}>Press Enter or click to start</div>
      </div>
    </div>
  );
}
