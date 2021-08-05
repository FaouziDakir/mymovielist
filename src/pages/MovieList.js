import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard'

function MovieList() {
  const [movies, setMovies] = useState([]);

  // meme hook mais version sans api
  // useEffect(() => {
  //   setMovies(MOVIES);
  // }, [])

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [])

  return (
    <div>
      <h1 className="center">My Movie List</h1>
      <div className="container">
        <div className="row">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;