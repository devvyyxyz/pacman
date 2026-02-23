import React, {useState} from 'react';
import Menu from './components/Menu';
import GameSetup, { GameOptions } from './pages/GameSetup';
import GamePlay from './pages/GamePlay';

type Route = 'menu' | 'setup' | 'play';

export default function App() {
  const [route, setRoute] = useState<Route>('menu');
  const [options, setOptions] = useState<GameOptions | null>(null);

  function handleStart(){
    setRoute('setup');
  }

  function handlePlay(opts:GameOptions){
    setOptions(opts);
    setRoute('play');
  }

  return (
    <div style={{minHeight: '100vh'}}>
      {route === 'menu' && (
        <Menu onStart={handleStart} />
      )}

      {route === 'setup' && (
        <GameSetup onPlay={handlePlay} onBack={()=>setRoute('menu')} />
      )}

      {route === 'play' && options && (
        <div className="game-enter">
          <GamePlay options={options} onBack={()=>setRoute('menu')} />
        </div>
      )}
    </div>
  );
}
