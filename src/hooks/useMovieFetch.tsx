import axios from 'axios'
import { useEffect, useState } from 'react'
import { TMDB } from '../api'

export type DataType = {
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
  results?: []
  total_pages?: number
  page?: number
  total_results?: number
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: boolean | null
  budget?: number
  genres?: [{ id: number; name: string }]
  homepage?: string
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

type LoadingType = boolean

type ErrorType = string | null

interface IData {
  data?: DataType
  isLoading?: LoadingType
  fetchError?: ErrorType
}

// TODO: Incorporate routes as mapped options
export const routes = {
  trending: (page = 1): string =>
    `/trending/all/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=${page}`,
  movies: (term, page = 1): string =>
    `/search/movie?api_key=${process.env.apiKey}&language=en-US&query=${term}&language=en-US&page=${page}`,
  movie: (movie_id, page = 1): string =>
    `movie/${movie_id}?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  credits: (movie_id, page = 1): string =>
    `/movie/${movie_id}/credits?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  popular: (page = 1): string =>
    `/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  topRated: (page = 1): string =>
    `/movie/top_rated?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
  genres: (movie_id, page = 1): string =>
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.apiKey}&language=en-US&page=${page}`,
}

export const useMovieFetch = (dataURL: string): IData => {
  const [data, setData] = useState<DataType>()
  const [fetchError, setFetchError] = useState<ErrorType>(null)
  const [isLoading, setIsLoading] = useState<LoadingType>(false)

  useEffect(() => {
    let isMounted = true
    const source = axios.CancelToken.source()

    const fetchData = async url => {
      setIsLoading(true)
      try {
        const response = await TMDB.get(url, {
          cancelToken: source.token,
        })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
        }
      } catch (err: any) {
        if (isMounted) {
          setFetchError(err.message)
          setData({})
        }
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    fetchData(dataURL)

    const cleanUp = () => {
      isMounted = false
      source.cancel()
    }

    return cleanUp
  }, [dataURL])

  return {
    data,
    fetchError,
    isLoading,
  }
}
