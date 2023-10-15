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
  // FIXME: Should be simplified to "data" to allow for credits, etc., as well as movies
  movies?: IMovie[] | { id: number; cast: []; crew: [] }
  setMovies: React.Dispatch<
    SetStateAction<never[] | { id: number; cast: []; crew: [] } | undefined>
  >
  isLoading: boolean | undefined
  setIsLoading: React.Dispatch<SetStateAction<boolean | undefined>>
}

export const DataContext = createContext<ContextType>({
  movies: [],
  // prettier-ignore
  setMovies: () => { [] },
  isLoading: false,
  setIsLoading: () => {
    false
  },
})

type Props = {
  children: React.ReactNode
}
export const DataProvider = ({ children }: Props): React.ReactElement => {
  const [movies, setMovies] = useState<
    never[] | { id: number; cast: []; crew: [] } | undefined
  >([])
  const [isLoading, setIsLoading] = useState<boolean | undefined>()

  return (
    <DataContext.Provider
      value={{ movies, setMovies, isLoading, setIsLoading }}>
      {children}
    </DataContext.Provider>
  )
}
