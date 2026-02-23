import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Menu(){
  const navigate = useNavigate()

  return (
    <div className="container" style={{marginTop:24}}>
      <h2 className="title">Pac-Man</h2>
      <div style={{marginTop:20}}>
        <button className="menu-button" onClick={() => navigate('/game')}>Start Game</button>
      </div>
      <div style={{marginTop:12}}>
        <button className="menu-button" onClick={() => navigate('/settings')}>Settings</button>
      </div>
      <div style={{marginTop:12}}>
        <button className="menu-button" onClick={() => { window.close(); navigate('/') }}>Exit Game</button>
      </div>
    </div>
  )
}
