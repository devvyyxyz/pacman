import React from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';

export default function Credits({onBack}:{onBack:()=>void}){
  return (
    <div className={menuStyles.wrap}>
      <div className={menuStyles.bg} aria-hidden />
      <div className={menuStyles.stage} role="main">
        <div className={menuStyles.title}>
          <h1 className={menuStyles.name}>CREDITS</h1>
          <p className={menuStyles.subtitle}>Thanks and acknowledgements</p>
        </div>

        <div style={{color:'var(--muted)',maxWidth:720,textAlign:'left',width:'100%'}}>
          <p><strong>Code:</strong> You (project author)</p>
          <p><strong>Audio / SFX:</strong> <a href="https://kronbits.itch.io/freesfx" target="_blank" rel="noopener noreferrer">https://kronbits.itch.io/freesfx</a></p>
        </div>

        <div style={{marginTop:18,width:'100%',display:'flex',justifyContent:'center'}}>
          <button className={`${menuStyles.btn} ${menuStyles.secondary}`} onClick={onBack}>Return to Menu</button>
        </div>

        <div className={menuStyles.footer} style={{width:'100%',textAlign:'center'}}>Thanks for playing — report bugs via the project repository.</div>
      </div>
    </div>
  );
}
