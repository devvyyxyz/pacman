import React, {useState} from 'react';
import Menu from './pages/Menu';

type Route = 'menu' | 'game' | 'classic' | 'credits';

export default function App() {
  const [route, setRoute] = useState<Route>('menu');

  return (
    <div style={{minHeight: '100vh'}}>
      {route === 'menu' && (
        <Menu
          onStart={() => setRoute('game')}
          onClassic={() => setRoute('classic')}
        />
      )}

      {route === 'game' && (
        <div style={{padding:40}}>
          <h2>Game (placeholder)</h2>
          <p>Game will mount here — implement game bootstrap in your engine.</p>
          <button className="btn" onClick={() => setRoute('menu')}>Back</button>
        </div>
      )}

      {route === 'classic' && (
        <div style={{padding:40}}>
          <h2>Classic Mode (placeholder)</h2>
          <p>Classic mode will launch here.</p>
          <button className="btn" onClick={() => setRoute('menu')}>Back</button>
        </div>
      )}
    </div>
  );
}
