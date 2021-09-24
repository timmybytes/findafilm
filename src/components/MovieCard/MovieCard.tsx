import {
  Badge,
  Box,
  Button,
  Icon,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { useState } from 'react'
import { getRatingColor } from '../../utils/helpers'

type MovieCardProps = {
  badge: string
  image: string
  title: string
  description: string
  date: string
}

export const MovieCard = ({
  badge,
  image,
  title,
  description,
  date,
}: MovieCardProps) => {
  const [toggle, setToggle] = useState(false)
  const year = date.slice(0, 4)
  const rating = parseFloat(badge)
  const ratingInfo = getRatingColor(rating)

  const { colorMode } = useColorMode()

  return (
    <Box
      overflow='hidden'
      shadow='xl'
      position='relative'
      maxW={350}
      display='grid'
      gridTemplateRows='1.3fr 1fr' // Important for cover art size consistency
    >
      {/* Cover Art */}
      <Image
        src={image}
        alt='MovieCard Image'
        // h='100%'
        fallbackSrc='https://via.placeholder.com/350x500.webp?text=No+Cover+Art'
      />
      {/* Meta Data */}
      <Box
        d='grid'
        gridTemplateRows='minmax(48px, min-content)'
        justifyContent='stretch'
        alignItems='stretch'
        w='100%'
        // Expand movie description when toggled
        sx={
          toggle
            ? {
                background: colorMode === 'dark' ? 'grey.800' : 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                h: '100%',
              }
            : {}
        }>
        <Badge
          bg={toggle ? 'gray.800' : ''}
          color={toggle ? 'white' : 'black'}
          d='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          maxH='48px'
          fontSize='md'
          colorScheme={ratingInfo.color}
          py={3}
          textAlign='center'>
          Average Rating: {rating === 0 ? 'N/A' : rating}{' '}
          {rating !== 0 && <Icon as={ratingInfo.icon} w={6} h={6} mx={1} />}
        </Badge>
        <Box
          px={{ base: 2, md: 4 }}
          overflow='scroll'
          bg={toggle ? 'gray.800' : ''}>
          <Text as='h2' fontWeight={700} fontSize='2xl' lineHeight='1.2' py={2}>
            {title}
          </Text>
          <Text>{year}</Text>
          <Box
          // h={toggle ? '100%' : 150}
          >
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
      <Box position='absolute' bottom={0} right={0} w='100%' d='flex'>
        <Button
          variant='outline'
          bg='white'
          colorScheme='blue'
          fontWeight={900}
          fontSize={{ base: 'sm', md: 'md' }}
          w='100%'
          rounded='none'
          onClick={() => setToggle(!toggle)}>
          Read {toggle ? 'less' : 'more'}
        </Button>
        <Button
          variant='solid'
          colorScheme='blue'
          fontWeight={900}
          fontSize={{ base: 'sm', md: 'md' }}
          w='100%'
          rounded='none'
          // TODO: Add queue context and click handler
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}
