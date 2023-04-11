import { useEffect, useState } from 'react'
import './App.css'

function FollowMouse () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointermove
  useEffect(() => {
    // 👀 effect is executed twice at the beginning because of the <React.StrictMode> when in dev mode
    function handleMove ({ clientX, clientY }) {
      setPosition({ x: clientX, y: clientY })
    }

    console.log('effect ', { enabled })
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // cleanup fn returned from effect is invoked when:
    //  1. component is unmounted
    //  2. deps change
    return () => window.removeEventListener('pointermove', handleMove)
  }, [enabled])
  // deps:
  //  -> []: cada vez que se _monta_ el componente
  //  -> [deps]: cada vez que se monta el componente + cuando cambian las dependencias
  //  -> undefined: cada vez que se _renderiza_ el componente

  // no cursor
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? 'No seguir puntero' : 'Seguir puntero'}
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
