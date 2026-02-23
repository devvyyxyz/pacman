import React, {useState} from 'react';
import { sendCrashReport } from '../../utils/report';
import menuStyles from '../../components/Menu/Menu.module.css';
import styles from './Error.module.css';

export default function ErrorPage({error, info, onBack}:{error:Error, info?:React.ErrorInfo | null, onBack?:()=>void}){
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function handleSend(){
    setSending(true);
    const res = await sendCrashReport({title: error.message, message: String(error), stack: info?.componentStack});
    setSending(false);
    setResult(res.ok ? 'sent' : `failed: ${res.reason || res.status}`);
  }

  async function handleCopy(){
    try{
      const payload = `${error.name}: ${error.message}\n\n${info?.componentStack || ''}`;
      await navigator.clipboard.writeText(payload);
      setCopied('Copied!');
      setTimeout(()=>setCopied(null),2000);
    }catch(e:any){
      setCopied('Failed');
      setTimeout(()=>setCopied(null),2000);
    }
  }

  function handleBack(){
    if(onBack) return onBack();
    // fallback: reload
    window.location.href = '/';
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.stage} role="main">
        <div className={styles.icon} aria-hidden>😵</div>
        <h2 className={styles.title}>Something went wrong</h2>
        <div className={styles.message}>We're sorry — the game encountered an error. You can send a crash report to the developer to help debug, or return to the main menu.</div>

        <details className={styles.details}>
          <summary style={{cursor:'pointer',fontWeight:700}}>Show technical details</summary>
          <div style={{marginTop:8}}><strong>{error.name}:</strong> {error.message}</div>
          <pre style={{whiteSpace:'pre-wrap',marginTop:8,fontSize:12,opacity:0.95}}>{info?.componentStack}</pre>
        </details>

        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <button className={`${menuStyles.btn} ${menuStyles.primary}`} onClick={handleSend} disabled={sending}>{sending? 'Sending…' : 'Send Crash Report'}</button>
            <button className={`${menuStyles.btn} ${menuStyles.secondary}`} onClick={handleBack}>Return To Menu</button>
            <button className={`${menuStyles.btn} ${menuStyles.secondary} ${styles.copyBtn}`} onClick={handleCopy}>{copied? copied : 'Copy Details'}</button>
            {result && <div className={styles.sendStatus}>Report status: {result}</div>}
          </div>
        </div>

        <div className={styles.footer}>If the issue persists, open an issue on the project repository with steps to reproduce.</div>
      </div>
    </div>
  );
}
