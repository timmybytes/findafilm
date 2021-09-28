import { useState, useEffect } from 'react'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const useCredits = (movie_id: number) => {
  const [credits, setCredits] = useState({})
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        ` https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${publicRuntimeConfig.API_KEY}&language=en-US`
      )
      const creditsData = await response.json()
      setCredits(creditsData)
    }

    fetchMovies()
  }, [movie_id])

  return credits
}
