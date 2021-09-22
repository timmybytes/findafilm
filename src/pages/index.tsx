import {
  Badge,
  Box,
  Button,
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

type MovieCardProps = {
  badge: string
  image: string
  title: string
  description: string
  date: string
}
const MovieCard = ({
  badge,
  image,
  title,
  description,
  date,
}: MovieCardProps) => {
  const [toggle, setToggle] = useState(false)
  const year = date.slice(0, 4)

  const rating = parseFloat(badge)
  const getRatingColor = (rating: number) => {
    // 1-2: red, 2-4: pink, 4-6: orange, 6-8: blue, 8-10: green
    if (rating === 0) {
      return { color: 'none', icon: BiMehBlank }
    }
    if (rating <= 3.5) {
      return { color: 'yellow', icon: BiDizzy }
    } else if (rating <= 5.5) {
      return { color: 'pink', icon: BiMeh }
    } else if (rating <= 7) {
      return { color: 'purple', icon: BiSmile }
    } else if (rating <= 8) {
      return { color: 'green', icon: BiHappy }
    } else {
      return { color: 'blue', icon: BiHappyHeartEyes }
    }
  }
  const ratingInfo = getRatingColor(rating)
  return (
    <Box rounded='20px' overflow='hidden' shadow='xl' position='relative'>
      <Skeleton
        isLoaded={!image.includes('null')}
        // minH={{ sm: '350px', md: '450px' }}
      ></Skeleton>
      <Image
        src={image}
        alt='MovieCard Image'
        fallbackSrc='https://via.placeholder.com/1250'
      />
      <Badge
        d='flex'
        justifyContent='center'
        alignItems='center'
        width='100%'
        fontSize='md'
        color='black'
        colorScheme={ratingInfo.color}
        py={3}
        textAlign='center'>
        Average Rating: {rating === 0 ? 'N/A' : rating}{' '}
        {rating !== 0 && <Icon as={ratingInfo.icon} w={6} h={6} mx={1} />}
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
        <Text>{year}</Text>
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

      <Grid
        gridGap={{ base: 2, md: 12 }}
        gridTemplateColumns='repeat(auto-fit, minmax(20rem, 1fr))'
        justifyItems='center'
        p={{ base: 2, md: 6 }}
        w='100%'>
        {console.log(movies)}
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
