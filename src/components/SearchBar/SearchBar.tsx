import { Box, IconButton, Input, Text } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { QueueContext } from '../../context/QueueContext'

export const SearchBar = () => {
  const { queue } = useContext(QueueContext)
  const [movies, setMovies] = useState(queue)
  const [inputTerm, setInputTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const IMG_API = 'https://image.tmdb.org/t/p/w1280'

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
