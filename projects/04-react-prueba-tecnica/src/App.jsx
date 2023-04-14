import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

export function App () {
  const { fact, updateFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={updateFact}>Get new fact</button>
      <section>
        {fact ? <p>{fact}</p> : null}
        {imageUrl ? <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} /> : null}
      </section>
    </main>
  )
}
