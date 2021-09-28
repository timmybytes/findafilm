import { Box, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MovieList } from '../components/MovieList/MovieList'
import { SearchBar } from '../components/SearchBar/SearchBar'

const Home: NextPage = () => {
  return (
    <Box>
      <Heading textAlign='center' fontSize='4rem' py={10}>
        Movies!
      </Heading>
      <Box as='main'>
        <SearchBar />
        <MovieList />
      </Box>
    </Box>
  )
}

export default Home
