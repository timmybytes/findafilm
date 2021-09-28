import { useState, useEffect } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const useMovie = (movie_id: number) => {
  const [movie, setMovie] = useState({})
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${publicRuntimeConfig.API_KEY}&language=en-US&page=1`
      )
      const movieData = await response.json()
      setMovie(movieData)
    }

    fetchMovies()
  }, [movie_id])

  return movie
}
