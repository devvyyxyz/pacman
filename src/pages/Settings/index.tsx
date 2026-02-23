import React, {useEffect, useState} from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';
import styles from './Settings.module.css';
import SETTINGS, { SettingMeta } from '../../config/settings';
import config from '../../config';
import { t, setLocale } from '../../i18n';
import Title from '../../components/Title';
import { DEFAULT_CONFIG } from '../../config/defaults';

type LocalSettings = Record<string, any>;

export default function Settings({onBack}:{onBack:()=>void}){
  const [local, setLocal] = useState<LocalSettings>({});
  const [applied, setApplied] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  useEffect(()=>{
    const cfg = config.loadConfig();
    setLocal({...cfg.settings});
  },[]);

  function update(key:string, value:any){
    const next = {...local, [key]: value};
    setLocal(next);
    // autosave for some realtime controls (audio)
    const AUTOSAVE_KEYS = ['sound','music','volume','maxLives'];
    if(AUTOSAVE_KEYS.includes(key)){
      config.saveConfig({settings: next as any});
      setSavedKey(key);
      setTimeout(()=>{ if(savedKey===key) setSavedKey(null); }, 1500);
    }

  }

  function handleApply(){
    config.saveConfig({settings: local as any});
    if(local.locale) setLocale(local.locale);
    setApplied(true);
    setTimeout(()=>setApplied(false), 2000);
  }

  function renderControl(s: SettingMeta){
    const val = local[s.id];
    const disabled = s.implemented === false;
    const savedIndicator = savedKey === s.id ? <div style={{marginLeft:8,color:'var(--accent)',fontSize:12,fontWeight:700}}>{t('settings_saved')}</div> : null;
    if(s.type === 'toggle'){
      return (
        <div className={styles.controls}>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={!!val} onChange={(e)=>update(s.id,e.target.checked)} disabled={disabled} />
            <span style={{opacity: disabled ? 0.6 : 1}}>{s.label}</span>
          </label>
          {savedIndicator}
        </div>
      );
    }
    if(s.type === 'select'){
      return (
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <select value={val || s.options?.[0]} onChange={(e)=>update(s.id,e.target.value)} disabled={disabled}>
            {s.options?.map(o=> {
              const display = s.id === 'difficulty' ? t(`diff_${o}`) : s.id === 'skin' ? t(`skin_${o}`) : (t(`opt_${o}`) || o);
              return <option key={o} value={o}>{display}</option>;
            })}
          </select>
          {savedIndicator}
        </div>
      );
    }
    if(s.type === 'range'){
      const v = typeof val === 'number' ? val : 70;
      return (
        <div className={styles.controls}>
          <input type="range" min={0} max={100} step={1} value={v} onChange={(e)=>update(s.id,parseInt(e.target.value))} disabled={disabled} />
          <div style={{minWidth:48,textAlign:'right'}}>{v}%</div>
          {savedIndicator}
        </div>
      );
    }
    if(s.type === 'number'){
      return (
        <div className={styles.controls}>
          <input type="number" value={val ?? 3} onChange={(e)=>update(s.id,parseInt(e.target.value||'0'))} disabled={disabled} />
          {savedIndicator}
        </div>
      );
    }
    if(s.id === 'locale'){
      const cur = local['locale'] || 'en';
      const NATIVE_LANG: Record<string,string> = { en: 'English', es: 'Español', pl: 'Polski' };
      return (
        <select value={cur} onChange={(e)=>{ update('locale', e.target.value); setLocale(e.target.value); }}>
          {s.options?.map(opt => <option key={opt} value={opt}>{NATIVE_LANG[opt] || opt}</option>)}
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
        <div className={`${menuStyles.title} ${styles.stickyTitle}`}>
            <Title title={t('settings_title')} subtitle={t('settings_subtitle')} sticky className={`${menuStyles.title} ${styles.stickyTitle}`} />
        </div>

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

        <div style={{marginTop:16,display:'flex',gap:8,justifyContent:'center',alignItems:'center'}}>
          <button className={menuStyles.btn} onClick={handleApply}>{t('settings_apply')}</button>
          <button className={menuStyles.btn} onClick={handleReset}>{t('settings_reset')}</button>
          <button className={menuStyles.btn} onClick={onBack}>{t('settings_back')}</button>
          {applied && <div style={{marginLeft:8,color:'var(--accent)',fontWeight:600}}>{t('settings_applied')}</div>}
        </div>
      </div>
    </div>
  );
}
