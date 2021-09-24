import { createContext, useEffect, useState } from 'react'

// type MoviesProps = []
// const movies: MoviesProps = []

const initialQueue = [
  {
    title: 'Movie',
    description: 'Description',
    image: 'Cover',
    date: 'Date',
    vote: 5.5,
  },
]
export const QueueContext = createContext(undefined)

type Props = {
  children: React.ReactNode
}
export const QueueProvider = ({ children }: Props) => {
  const [searchTerm, setSearchTerm] = useState('Marvel')
  const [queue, setQueue] = useState(initialQueue)

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=06cbaaa0bc746189acc7b951e418cf85&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      )

      const movieData = await response.json()
      setQueue(movieData.results)
    }

    fetchMovies(searchTerm)
  }, [searchTerm])

  return (
    <QueueContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </QueueContext.Provider>
  )
}
