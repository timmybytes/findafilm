import { Box, Button, IconButton, Input, Text } from '@chakra-ui/react'
import { routes, useAxiosFetch } from '@hooks/useAxiosFetch'
import { useContext, useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { DataContext } from '@context/DataContext'

export const SearchBar = (): React.ReactElement => {
  const popFetch = useAxiosFetch(routes.popular())
  const popMovies = popFetch.data?.results
  const topFetch = useAxiosFetch(routes.topRated())
  const topMovies = topFetch.data?.results
  const { setMovies, setIsLoading } = useContext(DataContext)
  const [inputValue, setInputValue] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data, isLoading } = useAxiosFetch(routes.movies(searchTerm))
  const [pages, setPages] = useState<number | undefined>(0)

  useEffect(() => {
    if (data !== undefined) {
      setMovies(data.results)
      setPages(data.total_pages)
    }
  }, [searchTerm, data, setMovies, isLoading, setIsLoading])

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
      {pages && pages > 0 && <Text>Page 1 of {pages}</Text>}
    </Box>
  )
}
