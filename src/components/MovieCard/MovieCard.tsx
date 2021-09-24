import { Badge, Box, Button, Icon, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
  BiDizzy,
  BiHappy,
  BiHappyHeartEyes,
  BiMeh,
  BiMehBlank,
  BiSmile,
} from 'react-icons/bi'

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

  const getRatingColor = (rating: number) => {
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
    <Box
      rounded='20px'
      overflow='hidden'
      shadow='xl'
      position='relative'
      maxW={350}>
      <Image
        src={image}
        alt='MovieCard Image'
        fallbackSrc='https://via.placeholder.com/350x500.webp?text=No+Cover+Art'
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
