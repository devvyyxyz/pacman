import React, { useRef, useEffect, useState } from 'react'

const TILE = 24
const COLS = 19
const ROWS = 15
const MOVE_INTERVAL = 120

function makeMaze() {
  const grid = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) grid[r][c] = 1
    }
  }
  // Add some interior walls
  for (let c = 2; c < COLS - 2; c++) {
    if (c % 4 === 0) grid[4][c] = 1
    if ((c + 2) % 5 === 0) grid[8][c] = 1
  }
  grid[7][9] = 0 // center open
  return grid
}

export default function Game() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [won, setWon] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = COLS * TILE
    canvas.height = ROWS * TILE

    const maze = makeMaze()
    const pellets = new Set()
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r][c] === 0) pellets.add(`${r},${c}`)
      }
    }

    let pac = { r: Math.floor(ROWS / 2), c: 1, dir: { r: 0, c: 1 } }
    pellets.delete(`${pac.r},${pac.c}`)
    setScore(1)

    let lastMove = performance.now()
    let running = true

    function draw() {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // walls
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (maze[r][c] === 1) {
            ctx.fillStyle = '#0033cc'
            ctx.fillRect(c * TILE, r * TILE, TILE, TILE)
          }
        }
      }

      // pellets
      ctx.fillStyle = '#fff'
      for (const p of pellets) {
        const [r, c] = p.split(',').map(Number)
        ctx.beginPath()
        ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // pacman
      const px = pac.c * TILE + TILE / 2
      const py = pac.r * TILE + TILE / 2
      ctx.fillStyle = '#ffcc00'
      const angle = Math.atan2(pac.dir.r, pac.dir.c)
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.arc(px, py, TILE / 2 - 2, angle - Math.PI / 4, angle + Math.PI / 4)
      ctx.closePath()
      ctx.fill()

      // score
      ctx.fillStyle = '#fff'
      ctx.font = '16px sans-serif'
      ctx.fillText(`Score: ${score}`, 8, 18)

      if (won) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#fff'
        ctx.font = '32px sans-serif'
        ctx.fillText('You Win!', canvas.width / 2 - 60, canvas.height / 2)
      }
    }

    function canMove(r, c) {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return false
      return maze[r][c] === 0
    }

    function step() {
      const nr = pac.r + pac.dir.r
      const nc = pac.c + pac.dir.c
      if (canMove(nr, nc)) {
        pac.r = nr
        pac.c = nc
      }
      const key = `${pac.r},${pac.c}`
      if (pellets.has(key)) {
        pellets.delete(key)
        setScore(s => s + 1)
        if (pellets.size === 0) {
          setWon(true)
          running = false
        }
      }
    }

    function gameLoop(now) {
      if (!running) return draw()
      if (now - lastMove > MOVE_INTERVAL) {
        lastMove = now
        step()
      }
      draw()
      requestAnimationFrame(gameLoop)
    }

    const keyHandler = (e) => {
      if (e.key === 'ArrowUp') pac.dir = { r: -1, c: 0 }
      if (e.key === 'ArrowDown') pac.dir = { r: 1, c: 0 }
      if (e.key === 'ArrowLeft') pac.dir = { r: 0, c: -1 }
      if (e.key === 'ArrowRight') pac.dir = { r: 0, c: 1 }
    }

    window.addEventListener('keydown', keyHandler)
    requestAnimationFrame(gameLoop)

    return () => {
      running = false
      window.removeEventListener('keydown', keyHandler)
    }
  }, [])

  return (
    <div className="game-wrap">
      <canvas ref={canvasRef} className="game-canvas" />
      {won && <div className="overlay">You Win!</div>}
    </div>
  )
}
