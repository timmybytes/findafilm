import { createContext, SetStateAction, useState } from 'react'

export interface IMovie {
  id: number
  poster_path: string
  title: string
  overview: string
  release_date: string
  vote_average: string
}

type ContextType = {
  movies: IMovie[]
  setMovies: React.Dispatch<SetStateAction<never[]>>
}

export const QueueContext = createContext<ContextType>({
  movies: [],
  // prettier-ignore
  setMovies: () => {[]},
})

type Props = {
  children: React.ReactNode
}

export const QueueProvider = ({ children }: Props): React.ReactElement => {
  const [movies, setMovies] = useState([])

  return (
    <QueueContext.Provider value={{ movies, setMovies }}>
      {children}
    </QueueContext.Provider>
  )
}
