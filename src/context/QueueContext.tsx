import { createContext, useEffect, useState } from 'react'

// type MoviesProps = []
// const movies: MoviesProps = []

const initialQueue = { queue: [] }
export const QueueContext = createContext(initialQueue)

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
    // @ts-ignore FIXME:
    <QueueContext.Provider value={{ searchTerm, setSearchTerm, queue }}>
      {children}
    </QueueContext.Provider>
  )
}
