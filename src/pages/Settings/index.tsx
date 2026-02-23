import React, {useEffect, useState} from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';

export default function Settings({onBack}:{onBack:()=>void}){
  const [sound,setSound] = useState(true);
  const [music,setMusic] = useState(true);

  useEffect(()=>{
    const s = localStorage.getItem('sound');
    if(s!==null) setSound(s==='true');
    const m = localStorage.getItem('music');
    if(m!==null) setMusic(m==='true');
  },[]);

  useEffect(()=>{ localStorage.setItem('sound', String(sound)); },[sound]);
  useEffect(()=>{ localStorage.setItem('music', String(music)); },[music]);

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:720,padding:20,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
        <h3 style={{marginTop:0}}>Settings</h3>
        <label style={{display:'block',marginTop:8}}><input type="checkbox" checked={sound} onChange={(e)=>setSound(e.target.checked)} /> Sound effects</label>
        <label style={{display:'block',marginTop:8}}><input type="checkbox" checked={music} onChange={(e)=>setMusic(e.target.checked)} /> Music</label>
        <div style={{marginTop:16,display:'flex',gap:8}}>
          <button className={menuStyles.btn} onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
