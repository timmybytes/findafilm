import { useEffect, useState } from 'react'

type CreditsType = {
  id?: number
  cast?: [
    {
      adult?: boolean
      cast_id?: number
      character?: string
      credit_id?: string
      gender?: number
      id?: number
      known_for_department?: string
      name?: string
      order?: number
      original_name?: string
      popularity?: number
      profile_path?: string | null
    }
  ]
  crew?: [
    {
      adult?: boolean
      credit_id?: string
      department?: string
      gender?: number
      id?: number
      job?: string
      known_for_department?: string
      name?: string
      original_name?: string
      popularity?: number
      profile_path?: string | null
    }
  ]
}

export const useCredits = (movie_id: number): CreditsType => {
  const [credits, setCredits] = useState<CreditsType>({
    id: 0,
    cast: [{}],
    crew: [{}],
  })
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          ` https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.apiKey}&language=en-US`
        )
        const creditsData = await response.json()
        setCredits(creditsData)
      } catch (e) {
        console.log('Failed to fetch movies', e)
      }
    }

    fetchMovies()
  }, [movie_id])

  return credits
}
