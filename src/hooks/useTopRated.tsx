import { useEffect, useState } from 'react'

export const useTopRated = () => {
  const [topMovies, setTopMovies] = useState([])
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.apiKey}&language=en-US&page=1`
        )
        const movieData = await response.json()
        setTopMovies(movieData.results)
      } catch (e) {
        console.log('Failed to fetch movies', e)
      }
    }

    fetchMovies()
  }, [])

  return topMovies
}
