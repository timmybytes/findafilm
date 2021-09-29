import type { NextPage } from 'next'
import { MovieList } from '../components/MovieList/MovieList'
import { SearchBar } from '../components/SearchBar/SearchBar'

const Home: NextPage = () => {
  return (
    <>
      <SearchBar />
      <MovieList />
    </>
  )
}

export default Home
