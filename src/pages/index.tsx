import {
  Box,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MovieCard } from '../components/MovieCard/MovieCard'
import { SearchBar } from '../components/SearchBar/SearchBar'

const SearchIcon = () => <Icon as={IoMdSearch} />

const Home: NextPage = () => {
  const [movies, setMovies] = useState([])
  const [inputTerm, setInputTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=06cbaaa0bc746189acc7b951e418cf85&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      )

      const movieData = await response.json()
      setMovies(movieData.results)
    }

    fetchMovies(searchTerm)
  }, [searchTerm])

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()
    setSearchTerm(inputTerm)
    setInputTerm('')
  }

  return (
    <Box>
      <Heading textAlign='center' fontSize='4rem' py={10}>
        Movies!
      </Heading>

      {/* TODO: Create separate component with stored logic */}
      {/* <Box
        as='form'
        p={10}
        d='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        onSubmit={handleSubmit}>
        <Text as='h2'>Search for movies</Text>
        <Box d='flex'>
          <Input
            placeholder='Ex., Captain Marvel'
            maxW='400px'
            value={inputTerm}
            onChange={e => setInputTerm(e.target.value)}
          />
          <IconButton
            colorScheme='blue'
            aria-label='Search database'
            onClick={handleSubmit}
            icon={<SearchIcon />}
          />
        </Box>
      </Box> */}

      <SearchBar />

      <Grid
        gridGap={{ base: 2, md: 12 }}
        gridTemplateColumns='repeat(auto-fit, minmax(15rem, 1fr))'
        justifyItems='center'
        p={{ base: 2, md: 6 }}
        w='100%'>
        {Array.isArray(movies) &&
          movies.map(
            (
              { title, overview, release_date, poster_path, vote_average },
              idx
            ) => (
              <MovieCard
                key={idx}
                title={title}
                description={overview}
                image={`${IMG_API}${poster_path}`}
                badge={vote_average}
                date={release_date}
              />
            )
          )}
      </Grid>
    </Box>
  )
}

export default Home
