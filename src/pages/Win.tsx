import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Win(){
  const nav = useNavigate()
  return (
    <div>
      <h2>You Win!</h2>
      <p>Nice job. Play again?</p>
      <button onClick={() => nav('/game')}>Play Again</button>
      <button onClick={() => nav('/') } style={{marginLeft:8}}>Main Menu</button>
    </div>
  )
}
