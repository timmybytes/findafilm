import { useState, useEffect } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const useTopRated = () => {
  const [topMovies, setTopMovies] = useState([])
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${publicRuntimeConfig.API_KEY}&language=en-US&page=1`
      )
      const movieData = await response.json()
      setTopMovies(movieData.results)
    }

    fetchMovies()
  }, [])

  return topMovies
}
