import { Box, Heading, IconButton, Input, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { MovieList } from '../components/MovieList/MovieList'

const useSearch = (searchTerm: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchResults(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`
      )

      const responseData = await response.json()
      setResults(responseData.results)
    }

    fetchResults(searchTerm)
  }, [searchTerm, API_KEY])
  return results
}

const Home: NextPage = () => {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [inputTerm, setInputTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const SearchIcon = () => <IoMdSearch />
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`
      )

      const movieData = await response.json()
      setMovies(movieData.results)
    }

    fetchMovies(searchTerm)
  }, [searchTerm, API_KEY])

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()
    setSearchTerm(inputTerm)
    setInputTerm('')
  }

  // const getGenres = async () => {
  //   const res = await fetch(
  //     'https://api.themoviedb.org/3/genre/movie/list?api_key=06cbaaa0bc746189acc7b951e418cf85&language=en-US'
  //   )

  //   const data = await res.json()
  //   setGenres(data.genres.map(genre => genre.name))
  // }

  // console.log(genres)

  return (
    <Box>
      <Heading textAlign='center' fontSize='4rem' py={10}>
        Movies!
      </Heading>

      {/* TODO: Create separate search component - with options */}
      {/* TODO: Create Context store for saving movies */}

      <Box
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
      </Box>
      <MovieList movies={movies} />
    </Box>
  )
}

export default Home
