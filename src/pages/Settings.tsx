import React, { useState } from 'react'

const DEFAULT_KEYS = ['pacman','ghost1','pellet','wall']

export default function Settings(){
  const [uploaded, setUploaded] = useState<Record<string,string>>({})

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const map: Record<string, string> = {}
    for (const f of Array.from(files)) {
      const name = f.name.toLowerCase()
      for (const k of DEFAULT_KEYS) {
        if (name.includes(k)) {
          const data = await fileToDataURL(f)
          localStorage.setItem(`sprites/${k}`, data)
          map[k] = f.name
          break
        }
      }
    }
    setUploaded(map)
  }

  function fileToDataURL(file: File){
    return new Promise<string>((res, rej) => {
      const r = new FileReader()
      r.onload = () => res(r.result as string)
      r.onerror = rej
      r.readAsDataURL(file)
    })
  }

  const clearSprites = () => {
    for (const k of DEFAULT_KEYS) localStorage.removeItem(`sprites/${k}`)
    setUploaded({})
  }

  return (
    <div className="container settings">
      <h3 className="title">Settings</h3>
      <p>Upload custom sprites (filenames should include pacman, ghost1, pellet, or wall). Uploaded images are stored in your browser localStorage.</p>
      <input type="file" onChange={handleFiles} multiple accept="image/*" />
      <div style={{marginTop:12}}>
        <button onClick={clearSprites}>Clear Uploaded Sprites</button>
      </div>
      <div style={{marginTop:12}}>
        <strong>Uploaded:</strong>
        <ul>
          {Object.entries(uploaded).map(([k,n]) => <li key={k}>{k}: {n}</li>)}
        </ul>
      </div>
      <div style={{marginTop:12}}>
        <p>Or place sprite files in <code>/public/assets/</code> named `pacman.png`, `ghost1.png`, `pellet.png`, `wall.png`.</p>
      </div>
    </div>
  )
}
