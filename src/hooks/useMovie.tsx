import { useEffect, useState } from 'react'

type MovieType = {
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: boolean | null
  budget?: number
  genres?: [{ id: number; name: string }]
  homepage?: string
  id?: number
  imdb_id?: string
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: [
    { id: number; logo_path: string; name: string; origin_country: string }
  ]
  production_countries?: [{ iso_3166_1: string; name: string }]
  release_date?: string
  revenue?: number
  runtime?: number
  spoken_languages?: [{ english_name: string; iso_639_1: string; name: string }]
  status?: string
  tagline?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export const useMovie = (movie_id: number): MovieType => {
  const [movie, setMovie] = useState<MovieType>({})
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.apiKey}&language=en-US&page=1`
        )
        const movieData = await response.json()
        setMovie(movieData)
      } catch (e) {
        console.log('Failed to fetch movies', e)
      }
    }

    fetchMovies()
  }, [movie_id])

  return movie
}
