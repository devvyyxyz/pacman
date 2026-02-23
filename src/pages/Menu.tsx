import React, {useEffect, useState, useRef} from 'react';
import styles from './Menu.module.css';

type Props = {
  onStart?: () => void;
  onClassic?: () => void;
};

export default function Menu({onStart, onClassic}: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);

  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonIds = ['start', 'classic', 'settings', 'credits'];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setCreditsOpen(false);
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setFocusedIndex((i) => (i + 1) % buttonIds.length);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setFocusedIndex((i) => (i - 1 + buttonIds.length) % buttonIds.length);
      }
      if (e.key === 'Enter') {
        const btn = buttonsRef.current[focusedIndex];
        btn?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = buttonsRef.current[focusedIndex];
    el?.focus();
  }, [focusedIndex]);

  function PrimaryButton({onClick, children}: {onClick?: () => void; children: React.ReactNode}){
    return (
      <button
        ref={(el) => (buttonsRef.current[0] = el)}
        className={`${styles.btn} ${styles.primary}`}
        onClick={onClick}
        aria-label="Start game"
      >
        {children}
      </button>
    );
  }

  function SecondaryButton({idx, onClick, children}:{idx:number;onClick?:()=>void;children:React.ReactNode}){
    return (
      <button
        ref={(el)=> (buttonsRef.current[idx] = el)}
        className={`${styles.btn} ${styles.secondary}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.bg} aria-hidden />

      {/* Maze outline SVG */}
      <svg className={styles.maze} viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect x="20" y="20" width="760" height="410" rx="12" ry="12" strokeWidth="0" stroke="none" fill="none" />
        <g stroke="#ffd84d" opacity="0.04" strokeWidth="1">
          <path d="M120 80h560M120 120h220M460 120h220M120 160h560M120 200h160M320 200h480M120 240h560M120 280h220M460 280h220M120 320h560" />
        </g>
      </svg>

      {/* Particles */}
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
          <PrimaryButton onClick={() => (onStart ? onStart() : console.log('start'))}>Start Game</PrimaryButton>
          <SecondaryButton idx={1} onClick={() => (onClassic ? onClassic() : console.log('classic'))}>Classic Mode</SecondaryButton>
          <SecondaryButton idx={2} onClick={() => setSettingsOpen(true)}>Settings</SecondaryButton>
          <SecondaryButton idx={3} onClick={() => setCreditsOpen(true)}>Credits</SecondaryButton>
        </div>

        <div className={styles.footer}>Use arrow keys to navigate • Enter to select</div>
      </div>

      {settingsOpen && (
        <div className="modal" aria-hidden={String(!settingsOpen)}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="settingsTitle">
            <h2 id="settingsTitle">Settings</h2>
            <label style={{display:'block',marginTop:8}}>
              <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} /> <span style={{marginLeft:8}}>Sound effects</span>
            </label>
            <label style={{display:'block',marginTop:8}}>
              <input type="checkbox" checked={music} onChange={(e) => setMusic(e.target.checked)} /> <span style={{marginLeft:8}}>Music</span>
            </label>
            <div className="modal-actions">
              <button id="closeSettings" className="btn" onClick={() => setSettingsOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {creditsOpen && (
        <div id="credits" className="credits">
          <div className="credits-card">
            <h3>Credits</h3>
            <p>Modernized Pac‑Man — built with ❤️</p>
            <button id="closeCredits" className="btn" onClick={() => setCreditsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
