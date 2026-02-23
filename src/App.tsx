import React from 'react'
import Game from './Game'

export default function App(){
  return (
    <div className="app">
      <h1>React Pacman (TypeScript)</h1>
      <p>Use arrow keys to move. Eat all pellets!</p>
      <Game />
    </div>
  )
}
