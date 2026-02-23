import React, {useEffect, useState} from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';
import styles from './Settings.module.css';
import SETTINGS, { SettingMeta } from '../../config/settings';
import config from '../../config';
import { t, setLocale } from '../../i18n';
import { DEFAULT_CONFIG } from '../../config/defaults';

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
    if(s.type === 'range'){
      const v = typeof val === 'number' ? val : 70;
      return (
        <div className={styles.controls}>
          <input type="range" min={0} max={100} step={1} value={v} onChange={(e)=>update(s.id,parseInt(e.target.value))} disabled={disabled} />
          <div style={{minWidth:48,textAlign:'right'}}>{v}%</div>
        </div>
      );
    }
    if(s.type === 'number'){
      return (
        <div className={styles.controls}>
          <input type="number" value={val ?? 3} onChange={(e)=>update(s.id,parseInt(e.target.value||'0'))} disabled={disabled} />
        </div>
      );
    }
    if(s.id === 'locale'){
      const cur = local['locale'] || 'en';
      return (
        <select value={cur} onChange={(e)=>{ update('locale', e.target.value); setLocale(e.target.value); }}>
          {s.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return null;
  }

  function handleReset(){
    const defaults = DEFAULT_CONFIG.settings as Record<string, any>;
    config.saveConfig({settings: defaults});
    setLocal({...defaults});
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <h2 className={styles.title}>Settings</h2>

        <div className={styles.grid}>
          {SETTINGS.map(s => (
            <div key={s.id} className={`${styles.card} ${s.implemented===false?styles.disabled:''} ${s.id==='difficulty' || s.id==='skin'?styles.full:''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardLabel}>{t(s.labelKey || s.label || s.id)}</div>
                <div>{s.implemented === false ? <small style={{color:'var(--muted)'}}>{t('coming_soon')}</small> : null}</div>
              </div>
              <div className={styles.cardDesc}>{s.description}</div>
              <div>
                {renderControl(s)}
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:16,display:'flex',gap:8,justifyContent:'center'}}>
          <button className={menuStyles.btn} onClick={handleReset}>{t('settings_reset')}</button>
          <button className={menuStyles.btn} onClick={onBack}>{t('settings_back')}</button>
        </div>
      </div>
    </div>
  );
}
