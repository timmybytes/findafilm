import { Box, Button, IconButton, Input, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { QueueContext } from '../../context/QueueContext'
import { usePopular } from '../../hooks/usePopular'
import { useTopRated } from '../../hooks/useTopRated'

export const SearchBar = (): React.ReactElement => {
  const popMovies = usePopular()
  const topMovies = useTopRated()
  const { setMovies } = useContext(QueueContext)
  const [inputValue, setInputValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
        )
        const movieData = await response.json()
        setMovies(movieData.results)
      } catch (e) {
        console.log('Failed to fetch movies', e)
      }
    }

    fetchMovies(searchTerm)
  }, [searchTerm, setMovies])

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault()
    setSearchTerm(inputValue)
    setInputValue('')
  }

  return (
    <Box
      as='form'
      d='flex'
      gridGap={2}
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      onSubmit={handleSubmit}
    >
      <Box
        d='flex'
        gridGap={2}
        flexWrap='nowrap'
        justifyContent='center'
        alignItems='center'
      >
        <Text
          as='h2'
          whiteSpace='nowrap'
          fontSize={{ base: '1.5rem', md: '2rem' }}
          fontWeight='thin'
        >
          Search for movies
        </Text>
        {/* TODO: Add optional cast lookup - will need a different kind of card */}
        {/* <Select maxW='100px'>
          <option value='title'>Title</option>
          <option value='cast-or-crew'>Cast or Crew</option>
        </Select> */}
      </Box>
      <Box d='flex' gridGap={2}>
        <Input
          placeholder='Ex., Captain Marvel'
          maxW='400px'
          value={inputValue}
          my={2}
          onChange={e => setInputValue(e.target.value)}
        />
        <IconButton
          my={2}
          colorScheme='blue'
          aria-label='Search database'
          onClick={handleSubmit}
          icon={<IoMdSearch />}
        />
      </Box>
      <Box d='flex' gridGap={2}>
        <Button colorScheme='blue' my={2} onClick={() => setMovies(popMovies)}>
          Popular Movies
        </Button>
        <Button
          colorScheme='yellow'
          my={2}
          onClick={() => setMovies(topMovies)}
        >
          Top Movies
        </Button>
      </Box>
    </Box>
  )
}
