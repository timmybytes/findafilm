import {
  Badge,
  Box,
  Heading,
  Icon,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useCredits } from '../../hooks/useCredits'
import { useMovie } from '../../hooks/useMovie'
import { coverArt, getRatingColor, getYear } from '../../utils/helpers'
import { CastTable } from './CastTable'
import { CrewTable } from './CrewTable'
import { GenreBadges } from './GenreBadges'

type MovieCardProps = {
  id: number
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
  id,
}: MovieCardProps) => {
  const [toggle, setToggle] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cover = coverArt(image, title)
  const year = getYear(date)
  const rating = parseFloat(badge)
  const ratingInfo = getRatingColor(rating)

  // @ts-ignore
  const { genres } = useMovie(id)
  const { cast, crew }: any = useCredits(id)

  const containerProps = {
    overflow: 'hidden',
    shadow: 'xl',
    minWidth: '100%',
    maxWidth: 350,
    rounded: 'md',
    onClick: () => setToggle(!toggle),
  }

  const badgeProps = {
    d: 'flex',
    top: 0,
    right: 0,
    m: 2,
    rounded: 'md',
    py: 1,
    px: 2,
    colorScheme: rating === 0 ? 'gray' : ratingInfo.color,
  }

  return (
    <Box pos='relative' {...containerProps}>
      <Image src={cover} alt={`${title}`} minH={367} loading='lazy' />
      <Badge position='absolute' fontSize='md' {...badgeProps}>
        {rating > 0 ? rating : 'N/A'}{' '}
        <Icon as={ratingInfo.icon} w={6} h={6} mx={1} />
      </Badge>
      <Modal
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        scrollBehavior='inside'
        isCentered>
        <ModalOverlay />
        <ModalContent overflow='scroll' p={4}>
          <ModalCloseButton color='white' bg='blue.600' p={2} rounded='full' />
          {!cover.includes('placeholder') && (
            <Image
              objectFit='cover'
              w='100%'
              maxH='300'
              src={cover}
              alt={`${title}`}
              objectPosition='center -50px'
              loading='lazy'
            />
          )}
          <Heading as='h2' pt={4}>
            {title}
          </Heading>
          <Box
            d='flex'
            justifyContent='flex-start'
            alignItems='center'
            flexWrap='wrap'>
            <Text fontWeight='bold'>({year})</Text>
            <Badge {...badgeProps} colorScheme={ratingInfo.color}>
              {rating > 0 ? `Average Rating: ${rating}` : 'No rating available'}
            </Badge>
          </Box>
          {genres && <GenreBadges genres={genres} />}
          <Text>{description || 'No description available'}</Text>
          {cast && <CastTable cast={cast} />}
          {crew && <CrewTable crew={crew} />}
        </ModalContent>
      </Modal>
    </Box>
  )
}
