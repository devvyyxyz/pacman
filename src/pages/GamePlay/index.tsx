import React from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';
import { GameOptions } from '../GameSetup';

export default function GamePlay({options, onBack}:{options:GameOptions; onBack:()=>void}){
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <div style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{color:'var(--muted)',fontSize:13}}>Ready — game will mount below</div>
        <div>
          <button className={menuStyles.btn} onClick={onBack}>Exit</button>
        </div>
      </div>

      <div id="game-root" style={{flex:1,position:'relative'}} />
    </div>
  );
}
