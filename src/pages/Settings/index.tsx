import React, {useEffect, useState} from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';
import styles from './Settings.module.css';
import SETTINGS, { SettingMeta } from '../../config/settings';
import config from '../../config';

type LocalSettings = Record<string, any>;

export default function Settings({onBack}:{onBack:()=>void}){
  const [local, setLocal] = useState<LocalSettings>({});

  useEffect(()=>{
    const cfg = config.loadConfig();
    setLocal({...cfg.settings});
  },[]);

  function update(key:string, value:any){
    const next = {...local, [key]: value};
    setLocal(next);
    config.saveConfig({settings: next as any});
  }

  function renderControl(s: SettingMeta){
    const val = local[s.id];
    const disabled = s.implemented === false;
    if(s.type === 'toggle'){
      return (
        <div className={styles.controls}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={!!val} onChange={(e)=>update(s.id,e.target.checked)} disabled={disabled} />
            <span style={{opacity: disabled ? 0.6 : 1}}>{s.label}</span>
          </label>
        </div>
      );
    }
    if(s.type === 'select'){
      return (
        <select value={val || s.options?.[0]} onChange={(e)=>update(s.id,e.target.value)} disabled={disabled}>
          {s.options?.map(o=> <option key={o} value={o}>{o}</option>)}
        </select>
      );
    }
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <h2 className={styles.title}>Settings</h2>

        <div className={styles.grid}>
          {SETTINGS.map(s => (
            <div key={s.id} className={`${styles.card} ${s.implemented===false?styles.disabled:''} ${s.id==='difficulty' || s.id==='skin'?styles.full:''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardLabel}>{s.label}</div>
                <div>{s.implemented === false ? <small style={{color:'var(--muted)'}}>Coming soon</small> : null}</div>
              </div>
              <div className={styles.cardDesc}>{s.description}</div>
              <div>
                {renderControl(s)}
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:16,display:'flex',gap:8,justifyContent:'center'}}>
          <button className={menuStyles.btn} onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
