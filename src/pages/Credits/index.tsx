import React from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';

export default function Credits({onBack}:{onBack:()=>void}){
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:720,padding:20,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
        <h3 style={{marginTop:0}}>Credits</h3>
        <p>Pac‑Man remake — modern menu UI by the project team.</p>
        <p>Assets: Original Namco game, free assets, and custom artwork.</p>
        <div style={{marginTop:16,display:'flex',gap:8}}>
          <button className={menuStyles.btn} onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}
