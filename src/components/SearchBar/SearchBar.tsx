import {
  Badge,
  Box,
  Button,
  Icon,
  Image,
  Text,
  Input,
  IconButton,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  BiDizzy,
  BiHappy,
  BiHappyHeartEyes,
  BiMeh,
  BiMehBlank,
  BiSmile,
} from 'react-icons/bi'
import { IoMdSearch } from 'react-icons/io'

const SearchIcon = () => <Icon as={IoMdSearch} />

export const SearchBar = () => {
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
          icon={<IoMdSearch />}
        />
      </Box>
    </Box>
  )
}
