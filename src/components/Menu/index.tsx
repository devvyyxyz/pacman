import React from 'react';
import styles from './Menu.module.css';
import { t } from '../../i18n';
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
          <p className={styles.subtitle}>{t('menu_subtitle')}</p>
        </div>

        <div className={styles.controls} role="navigation" aria-label="Main menu">
          <button
            className={`${styles.btn} ${styles.primary}`}
            onClick={handleStart}
            autoFocus
            aria-disabled={starting}
          >
            {starting ? t('starting') : t('start_game')}
          </button>

          <div className={styles.row}>
            <button className={`${styles.btn} ${styles.secondary}`} onClick={handleSettings}>{t('menu_settings')}</button>
            <button className={`${styles.btn} ${styles.secondary}`} onClick={handleCredits}>{t('menu_credits')}</button>
            <button className={`${styles.btn} ${styles.secondary}`} onClick={handleError}>{t('menu_simulate_error')}</button>
          </div>
        </div>

        <div className={styles.footer}>{t('menu_footer')}</div>
      </div>
    </div>
  );
}
