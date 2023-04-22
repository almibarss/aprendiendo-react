import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^[0-9]+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  function handleSubmit(event) {
    event.preventDefault()

    // uncontrolled form: faster
    const fields = Object.fromEntries(
      new window.FormData(event.target)
    )
    console.log(fields)

    // controlled form
    console.log({ search })

    getMovies()
  }

  function handleChange(event) {
    updateSearch(event.target.value)
  }


  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            name='query' 
            onChange={handleChange} 
            value={search} 
            placeholder='Avengers, Star Wars...' />
          <button type='submit'>Buscar</button>
        </form>
        {error 
          ? <p style={{ color: 'red' }}>{error}</p>
          : null }
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
