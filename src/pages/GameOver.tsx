import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameOver(){
  const nav = useNavigate()
  return (
    <div>
      <h2>Game Over</h2>
      <p>Try again!</p>
      <button onClick={() => nav('/game')}>Play Again</button>
      <button onClick={() => nav('/') } style={{marginLeft:8}}>Main Menu</button>
    </div>
  )
}
