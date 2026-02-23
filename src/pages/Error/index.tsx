import React, {useState} from 'react';
import { sendCrashReport } from '../../utils/report';
import menuStyles from '../../components/Menu/Menu.module.css';

export default function ErrorPage({error, info}:{error:Error, info?:React.ErrorInfo | null}){
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSend(){
    setSending(true);
    const res = await sendCrashReport({title: error.message, message: String(error), stack: info?.componentStack});
    setSending(false);
    setResult(res.ok ? 'sent' : `failed: ${res.reason || res.status}`);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{maxWidth:760,background:'rgba(255,255,255,0.02)',padding:24,borderRadius:12}}>
        <h2 style={{marginTop:0}}>Something went wrong</h2>
        <p>We're sorry — the game encountered an error. You can send a crash report to the developer to help debug.</p>
        <details style={{whiteSpace:'pre-wrap',background:'rgba(0,0,0,0.2)',padding:12,borderRadius:8}}>
          <summary>Details</summary>
          <div style={{marginTop:8}}><strong>{error.name}:</strong> {error.message}</div>
          <div style={{marginTop:8}}>{info?.componentStack}</div>
        </details>

        <div style={{display:'flex',gap:12,marginTop:16}}>
          <button className={menuStyles.btn} onClick={handleSend} disabled={sending}>{sending? 'Sending…' : 'Send Crash Report'}</button>
          <a className={menuStyles.btn} href="/" style={{textDecoration:'none',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>Return To Menu</a>
        </div>
        {result && <div style={{marginTop:12}}>Report status: {result}</div>}
      </div>
    </div>
  );
}
