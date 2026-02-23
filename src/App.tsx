import React, {useState} from 'react';
import Menu from './pages/Menu';

type Route = 'menu' | 'game';

export default function App() {
  const [route, setRoute] = useState<Route>('menu');

  return (
    <div style={{minHeight: '100vh'}}>
      {route === 'menu' && (
        <Menu onStart={() => setRoute('game')} />
      )}

      {route === 'game' && (
        <div style={{padding:40}}>
          <h2>Game (placeholder)</h2>
          <p>Game will mount here — implement game bootstrap in your engine.</p>
          <button className="btn" onClick={() => setRoute('menu')}>Back</button>
        </div>
      )}
    </div>
  );
}
