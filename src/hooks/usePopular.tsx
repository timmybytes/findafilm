import { useState, useEffect } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const usePopular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${publicRuntimeConfig.API_KEY}&language=en-US&page=1`
      )
      const movieData = await response.json()
      setPopularMovies(movieData.results)
    }

    fetchMovies()
  }, [])

  return popularMovies
}
