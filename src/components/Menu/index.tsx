import React from 'react';
import styles from './Menu.module.css';
import { useI18n } from '../../components';
import { playChomp } from '../../utils/audio';
import Button from '../Button';

type Props = { onStart?: () => void, onOpenSettings?: ()=>void, onOpenCredits?: ()=>void, onError?: ()=>void };

export default function Menu({onStart, onOpenSettings, onOpenCredits, onError}: Props) {
  const [starting, setStarting] = React.useState(false);
  const { t } = useI18n();

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
          <Button variant="primary" full onClick={handleStart} autoFocus aria-disabled={starting}>{starting ? t('starting') : t('start_game')}</Button>

          <div className={styles.row}>
            <Button variant="secondary" full onClick={handleSettings}>{t('menu_settings')}</Button>
            <Button variant="secondary" full onClick={handleCredits}>{t('menu_credits')}</Button>
            <Button variant="secondary" full onClick={handleError}>{t('menu_simulate_error')}</Button>
          </div>
        </div>

        <div className={styles.footer}>{t('menu_footer')}</div>
      </div>
    </div>
  );
}
