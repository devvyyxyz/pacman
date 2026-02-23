import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Game from './Game'
import GameOver from './pages/GameOver'
import Win from './pages/Win'
import Settings from './pages/Settings'

export default function App(){
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/gameover" element={<GameOver/>} />
        <Route path="/win" element={<Win/>} />
      </Routes>
    </div>
  )
}
