import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
// import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import { IoMdSearch } from 'react-icons/io'

const SearchIcon = () => <Icon as={IoMdSearch} />

type MovieCardProps = {
  badge: string
  image: string
  title: string
  description: string
}
const MovieCard = ({ badge, image, title, description }: MovieCardProps) => {
  const [toggle, setToggle] = useState(false)
  const rating = parseFloat(badge)
  const getRatingColor = (rating: number) => {
    // 1-2: red, 2-4: pink, 4-6: orange, 6-8: blue, 8-10: green
    if (rating <= 2) {
      return 'red'
    } else if (rating <= 4) {
      return 'pink'
    } else if (rating <= 6) {
      return 'orange'
    } else if (rating <= 8) {
      return 'blue'
    } else {
      return 'green'
    }
  }
  return (
    <Box
      rounded='20px'
      overflow='hidden'
      shadow='xl'
      position='relative'
      // maxW={400}
    >
      <Box>
        <Skeleton
          isLoaded={!image.includes('null')}
          minH={{ sm: '350px', md: '450px' }}>
          <Image src={image} alt='MovieCard Image' />
        </Skeleton>
        <Badge
          d='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          fontSize='md'
          color='black'
          colorScheme={getRatingColor(rating)}
          py={2}
          textAlign='center'>
          Average Rating: {rating}{' '}
          <Icon as={rating < 5.5 ? BiDislike : BiLike} w={7} h={7} p={1} />
        </Badge>
        <Box
          px={{ base: 2, md: 4 }}
          d='flex'
          flexDir='column'
          justifyContent='space-between'
          alignItems='center'
          position='relative'>
          <Text as='h2' fontWeight={700} fontSize='2xl' lineHeight='1.2' py={2}>
            {title}
          </Text>
          <Box h={toggle ? 'auto' : 150}>
            <Text
              fontWeight={400}
              minH={100}
              h={toggle ? 'auto' : 100}
              overflow={toggle ? 'auto' : 'hidden'}
              pb='45px'>
              {description || 'No description available'}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box position='absolute' bottom={0} right={0} w='100%'>
        <Button
          variant='solid'
          colorScheme='blue'
          fontWeight={900}
          fontSize={{ base: 'sm', md: 'md' }}
          w='100%'
          rounded='none'
          onClick={() => setToggle(!toggle)}>
          Read {toggle ? 'less' : 'more'}
        </Button>
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
      <Grid
        gridGap={{ base: 2, md: 12 }}
        gridTemplateColumns='repeat(auto-fit, minmax(20rem, 1fr))'
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
              />
            )
          )}
      </Grid>
    </Box>
  )
}

export default Home
