import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  SimpleGrid,
  SlideFade,
  Spacer,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

const SearchIcon = () => <Icon as={IoMdSearch} />

type CardProps = {
  badge?: string
  image?: string
  title?: string
  description?: string
  button?: string
}
const Card = ({ badge, image, title, description, button }: CardProps) => {
  const { colorMode } = useColorMode()
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Box
      // w='300px'
      rounded='20px'
      overflow='hidden'
      shadow='xl'
      // bg={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      mt={10}>
      <Box position='relative'>
        <Image
          src={image}
          alt='Card Image'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <SlideFade in={isHovered}>
          <Text
            fontWeight={400}
            position='absolute'
            top='0'
            maxH='200px'
            // overflow='scroll'
            bg='gray.800'
            color='white'>
            {description || 'No description available'}
          </Text>
        </SlideFade>
      </Box>
      <Box p={5}>
        <Stack align='center'>
          <Badge variant='subtle' colorScheme='blue' rounded='full' px={2}>
            {badge}
          </Badge>
        </Stack>
        <Stack my={4}>
          <Text as='h2' fontWeight={700} fontSize='xl' my={2}>
            {title}
          </Text>
        </Stack>

        <Flex>
          <Spacer />
          <Button variant='solid' colorScheme='blue' size='sm'>
            {button}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

const Home: NextPage = () => {
  const [movies, setMovies] = useState([])
  const [inputTerm, setInputTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchMovies(searchTerm: string) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=06cbaaa0bc746189acc7b951e418cf85&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      )
      const movieData = await response.json()
      // waits until the request completes...
      console.log(movieData.results)
      setMovies(movieData.results)
    }

    fetchMovies(searchTerm)
  }, [searchTerm])

  const IMG_API = 'https://image.tmdb.org/t/p/w1280'

  return (
    <Box>
      <Heading textAlign='center' fontSize='4rem' py={10}>
        Movies!
      </Heading>

      <FormControl
        id='first-name'
        p={10}
        d='flex'
        flexDir='column'
        justifyContent='center'
        onSubmit={() => {
          setSearchTerm(inputTerm)
          setInputTerm('')
        }}
        alignItems='center'>
        <FormLabel>Search for movies</FormLabel>
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
            icon={<SearchIcon />}
            onClick={() => {
              setSearchTerm(inputTerm)
              setInputTerm('')
            }}
          />
        </Box>
      </FormControl>
      <SimpleGrid spacing={12} columns={3} p={6}>
        {Array.isArray(movies) &&
          movies.map(
            (
              { title, overview, release_date, poster_path, vote_average },
              idx
            ) => (
              <Card
                key={idx}
                title={title}
                description={overview}
                image={`${IMG_API}${poster_path}`}
                badge={vote_average}
                button='Read more'
              />
            )
          )}
      </SimpleGrid>
    </Box>
  )
}

export default Home
