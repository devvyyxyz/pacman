import React, {useState} from 'react';
import styles from './GameSetup.module.css';
import menuStyles from '../../components/Menu/Menu.module.css';

export type GameOptions = {
  skin: string;
  difficulty: 'easy'|'normal'|'hard';
  sound: boolean;
  music: boolean;
}

export default function GameSetup({onPlay, onBack}:{onPlay:(opts:GameOptions)=>void; onBack:()=>void}){
  const skins = [
    {id:'classic', color:'#ffd84d'},
    {id:'neon', color:'#00f0ff'},
    {id:'ghost', color:'#ff6b8a'},
  ];

  const [skin,setSkin] = useState(skins[0].id);
  const [difficulty,setDifficulty] = useState<GameOptions['difficulty']>('normal');
  const [sound,setSound] = useState(true);
  const [music,setMusic] = useState(true);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h3 className={styles.title}>Prepare your run</h3>
          <p className={styles.label}>Choose skin</p>
          <div className={styles.skins}>
            {skins.map(s => (
              <div key={s.id}
                role="button"
                tabIndex={0}
                aria-pressed={skin===s.id}
                onClick={()=>setSkin(s.id)}
                onKeyDown={(e)=>{ if(e.key==='Enter') setSkin(s.id)}}
                className={`${styles.skin} ${skin===s.id?styles.selected:''}`}
                style={{background:s.color}}
              />
            ))}
          </div>

          <div style={{height:12}} />

          <div className={styles.controls}>
            <div>
              <div className={styles.label}>Difficulty</div>
              <div className={styles.row}>
                <label className={styles.small}><input type="radio" name="diff" checked={difficulty==='easy'} onChange={()=>setDifficulty('easy')} /> Easy</label>
                <label className={styles.small}><input type="radio" name="diff" checked={difficulty==='normal'} onChange={()=>setDifficulty('normal')} /> Normal</label>
                <label className={styles.small}><input type="radio" name="diff" checked={difficulty==='hard'} onChange={()=>setDifficulty('hard')} /> Hard</label>
              </div>
            </div>

            <div>
              <div className={styles.label}>Audio</div>
              <div className={styles.row}>
                <label className={styles.small}><input type="checkbox" checked={sound} onChange={(e)=>setSound(e.target.checked)} /> Sound</label>
                <label className={styles.small}><input type="checkbox" checked={music} onChange={(e)=>setMusic(e.target.checked)} /> Music</label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            <div className={styles.label}>Summary</div>
            <div className={styles.small}>Skin: {skin}</div>
            <div className={styles.small}>Difficulty: {difficulty}</div>
            <div className={styles.small}>Sound: {sound? 'On':'Off'}</div>
            <div className={styles.small}>Music: {music? 'On':'Off'}</div>

            <div style={{height:12}} />
            <button className={`${menuStyles.btn} ${menuStyles.primary} ${styles.playBtn}`} onClick={()=>onPlay({skin,difficulty,sound,music})}>Play</button>
            <button className={menuStyles.btn} style={{marginTop:8}} onClick={onBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
