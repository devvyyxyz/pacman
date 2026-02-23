import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Menu(){
  const navigate = useNavigate()

  return (
    <div style={{textAlign:'center', marginTop:24}}>
      <h2>React Pacman</h2>
      <div style={{marginTop:20}}>
        <button onClick={() => navigate('/game')}>Start Game</button>
      </div>
      <div style={{marginTop:12}}>
        <button onClick={() => navigate('/settings')}>Settings</button>
      </div>
      <div style={{marginTop:12}}>
        <button onClick={() => { window.close(); navigate('/') }}>Exit Game</button>
      </div>
    </div>
  )
}
