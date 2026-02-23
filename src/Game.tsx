import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TILE = 28
const COLS = 21
const ROWS = 17
const MOVE_INTERVAL = 120

type Dir = { r: number; c: number }
type Ghost = { r: number; c: number; dir: Dir; color: string }

function makeMaze(): number[][] {
  const grid = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) grid[r][c] = 1
    }
  }
  // Create a more unique maze: symmetric blocks and tunnels
  for (let r = 2; r < ROWS - 2; r += 4) {
    for (let c = 2; c < COLS - 2; c++) {
      if ((c + r) % 3 === 0) grid[r][c] = 1
    }
  }
  for (let c = 2; c < COLS - 2; c += 6) {
    for (let r = 3; r < ROWS - 3; r++) grid[r][c] = 1
  }
  // horizontal central bar with a tunnel
  const mid = Math.floor(ROWS / 2)
  for (let c = 2; c < COLS - 2; c++) if (c !== Math.floor(COLS / 2)) grid[mid][c] = 1
  // small rooms
  grid[3][3] = 1; grid[3][4] = 1; grid[4][3] = 1
  grid[3][COLS - 4] = 1; grid[3][COLS - 5] = 1; grid[4][COLS - 4] = 1
  return grid
}

export default function Game(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const navigate = useNavigate()
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = COLS * TILE
    canvas.height = ROWS * TILE

    const maze = makeMaze()
    const pellets = new Set<string>()
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r][c] === 0) pellets.add(`${r},${c}`)
      }
    }

    const pac = { r: Math.floor(ROWS / 2), c: 1, dir: { r: 0, c: 1 } as Dir }
    pellets.delete(`${pac.r},${pac.c}`)
    setScore(pellets.size)

    const ghosts: Ghost[] = [
      { r: 1, c: COLS - 2, dir: { r: 0, c: -1 }, color: '#ff0000' },
      { r: ROWS - 2, c: COLS - 2, dir: { r: -1, c: 0 }, color: '#ffb8ff' },
      { r: 1, c: Math.floor(COLS/2), dir: { r: 0, c: 1 }, color: '#00ffff' }
    ]

    // attempt to load uploaded sprites from localStorage or public /sprites folder
    const spriteKeys = ['pacman','ghost1','pellet','wall'] as const
    const sprites: Record<string, HTMLImageElement | null> = { pacman: null, ghost1: null, pellet: null, wall: null }

    for (const k of spriteKeys) {
      const key = `sprites/${k}`
      const data = localStorage.getItem(key)
      const img = new Image()
      img.onload = () => { sprites[k] = img }
      img.onerror = () => { sprites[k] = null }
      if (data) img.src = data
      else img.src = `/assets/${k}.png`
    }

    let lastMove = performance.now()
    let running = true

    function draw() {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // walls
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (maze[r][c] === 1) {
            if (sprites.wall && sprites.wall.complete) ctx.drawImage(sprites.wall, c * TILE, r * TILE, TILE, TILE)
            else {
              ctx.fillStyle = '#0033cc'
              ctx.fillRect(c * TILE, r * TILE, TILE, TILE)
            }
          }
        }
      }

      // pellets
      for (const p of pellets) {
        const [r, c] = p.split(',').map(Number)
        if (sprites.pellet && sprites.pellet.complete) ctx.drawImage(sprites.pellet, c * TILE + TILE/2 - 4, r * TILE + TILE/2 - 4, 8, 8)
        else {
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // pacman
      const px = pac.c * TILE + TILE / 2
      const py = pac.r * TILE + TILE / 2
      if (sprites.pacman && sprites.pacman.complete) ctx.drawImage(sprites.pacman, pac.c * TILE, pac.r * TILE, TILE, TILE)
      else {
        ctx.fillStyle = '#ffcc00'
        const angle = Math.atan2(pac.dir.r, pac.dir.c)
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.arc(px, py, TILE / 2 - 2, angle - Math.PI / 4, angle + Math.PI / 4)
        ctx.closePath()
        ctx.fill()
      }

      // ghosts
      for (const g of ghosts) {
        if (sprites.ghost1 && sprites.ghost1.complete) ctx.drawImage(sprites.ghost1, g.c * TILE, g.r * TILE, TILE, TILE)
        else {
          ctx.fillStyle = g.color
          ctx.beginPath()
          ctx.arc(g.c * TILE + TILE / 2, g.r * TILE + TILE / 2, TILE / 2 - 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // score
      ctx.fillStyle = '#fff'
      ctx.font = '16px sans-serif'
      ctx.fillText(`Pellets remaining: ${pellets.size}`, 8, 18)
    }

    function canMove(r: number, c: number) {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return false
      return maze[r][c] === 0
    }

    const DIRS: Dir[] = [
      { r: -1, c: 0 },
      { r: 1, c: 0 },
      { r: 0, c: -1 },
      { r: 0, c: 1 }
    ]

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
          running = false
          navigate('/win')
        }
      }

      // move ghosts
      for (const g of ghosts) {
        moveGhost(g)
        // simple collision
        if (g.r === pac.r && g.c === pac.c) {
          running = false
          navigate('/gameover')
        }
      }
    }

    function moveGhost(g: Ghost) {
      const dist = Math.abs(g.r - pac.r) + Math.abs(g.c - pac.c)
      let options: Dir[] = []
      for (const d of DIRS) {
        const nr = g.r + d.r
        const nc = g.c + d.c
        if (canMove(nr, nc)) options.push(d)
      }
      if (options.length === 0) return
      let chosen: Dir
      if (dist < 6) {
        options.sort((a, b) => {
          const da = Math.abs((g.r + a.r) - pac.r) + Math.abs((g.c + a.c) - pac.c)
          const db = Math.abs((g.r + b.r) - pac.r) + Math.abs((g.c + b.c) - pac.c)
          return da - db
        })
        chosen = options[0]
      } else {
        const nonReverse = options.filter(o => o.r !== -g.dir.r || o.c !== -g.dir.c)
        const pickFrom = nonReverse.length ? nonReverse : options
        chosen = pickFrom[Math.floor(Math.random() * pickFrom.length)]
      }
      g.r += chosen.r
      g.c += chosen.c
      g.dir = chosen
    }

    function gameLoop(now: number) {
      if (!running) return draw()
      if (now - lastMove > MOVE_INTERVAL) {
        lastMove = now
        step()
      }
      draw()
      requestAnimationFrame(gameLoop)
    }

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') pac.dir = { r: -1, c: 0 }
      if (e.key === 'ArrowDown') pac.dir = { r: 1, c: 0 }
      if (e.key === 'ArrowLeft') pac.dir = { r: 0, c: -1 }
      if (e.key === 'ArrowRight') pac.dir = { r: 0, c: 1 }
    }

    window.addEventListener('keydown', keyHandler)

    requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', keyHandler)
    }
  }, [])

  return (
    <div className="game-wrap">
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  )
}
