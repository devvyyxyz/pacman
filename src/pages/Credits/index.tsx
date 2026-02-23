import React from 'react';
import menuStyles from '../../components/Menu/Menu.module.css';
import styles from './Credits.module.css';
import CREDITS from '../../config/credits';

export default function Credits({onBack}:{onBack:()=>void}){
  return (
    <div className={menuStyles.wrap}>
      <div className={menuStyles.bg} aria-hidden />
      <div className={menuStyles.stage} role="main">
        <div className={menuStyles.title}>
          <h1 className={menuStyles.name}>Credits</h1>
          <p className={menuStyles.subtitle}>Thanks and acknowledgements</p>
        </div>

        <div className={styles.cards}>
          {CREDITS.map(c => {
            const CardInner = (
              <div className={styles.card} key={c.id}>
                <div>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon} aria-hidden>
                      {c.icon ? <img src={c.icon} alt="" style={{width:28,height:28}}/> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffd84d" strokeWidth="1.5"><circle cx="12" cy="12" r="6" /></svg>}
                    </div>
                    <div>
                      <h4 className={styles.cardTitle}>{c.name}</h4>
                      {c.role && <div className={styles.cardRole}>{c.role}</div>}
                    </div>
                  </div>
                  {c.note && <div className={styles.cardNote}>{c.note}</div>}
                </div>
                {c.url && <div className={styles.cardFooter}><div className={styles.cardLink}>Visit →</div></div>}
              </div>
            );

            if(c.url){
              return (
                <a key={c.id} className={styles.cardLinkWrap} href={c.url} target="_blank" rel="noopener noreferrer">
                  {CardInner}
                </a>
              );
            }

            return <div key={c.id}>{CardInner}</div>;
          })}
        </div>

        <div style={{marginTop:18,width:'100%',display:'flex',justifyContent:'center'}}>
          <button className={`${menuStyles.btn} ${menuStyles.secondary}`} onClick={onBack}>Return to Menu</button>
        </div>

        <div className={menuStyles.footer} style={{width:'100%',textAlign:'center'}}>Thanks for playing — report bugs via the project repository.</div>
      </div>
    </div>
  );
}
