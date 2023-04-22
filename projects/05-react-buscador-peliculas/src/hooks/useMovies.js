import withResults from '../../mocks/with-results.json'
import withoutResults from '../../mocks/no-results.json'
import { useState } from 'react'

const API_KEY = '4287ad07'

export function useMovies({ search }) {
  const [ responseMovies, setResponseMovies ] = useState([])

  const movies = responseMovies.Search

  const mappedMovies = movies?.map((movie) => ( {
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  } ))

  function getMovies() {
    if (search) {
      // setResponseMovies(withResults)
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
       .then((res) => res.json())
       .then((json) => setResponseMovies(json))
    } else {
      setResponseMovies(withoutResults)
    }
  }

  return { movies: mappedMovies, getMovies }
}