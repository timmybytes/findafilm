import { useEffect, useState } from 'react'

export const usePopular = () => {
  const [popularMovies, setPopularMovies] = useState([])
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=1`
        )
        const movieData = await response.json()
        setPopularMovies(movieData.results)
      } catch (e) {
        console.log('Failed to fetch movies', e)
      }
    }

    fetchMovies()
  }, [])

  return popularMovies
}
