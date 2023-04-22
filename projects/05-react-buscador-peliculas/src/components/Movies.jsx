function ListOfMovies ({ movies }) {
    return (
              <ul className="movies">
              { movies.map((movie) => (
                  <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                  </li>
                ))
              }
              </ul>
            )
}

function NoMoviesResults () {
    return (
        <p>No se han encontrado resultados para esta búsqueda</p>
    )
}

export function Movies({ movies }) {
    return movies?.length > 0
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
}