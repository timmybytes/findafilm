import {
  Box,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useAxiosFetch, routes } from '@hooks/useAxiosFetch'
import { useState } from 'react'
import { coverArt, getYear } from '@utils/helpers'
import { DetailTabs } from './DetailTabs'
import { GenreBadges } from './GenreBadges'
import { RatingBadge } from './RatingBadge'

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
}: MovieCardProps): React.ReactElement => {
  const [toggle, setToggle] = useState(false)
  const cover = coverArt(image, title)
  const year = getYear(date)
  const credits = useAxiosFetch(routes.credits(id))
  const movie = useAxiosFetch(routes.movie(id))
  const genres = movie?.data?.genres
  const cast = credits?.data?.cast
  const crew = credits?.data?.crew

  const containerProps = {
    overflow: 'hidden',
    shadow: 'xl',
    minWidth: '100%',
    maxWidth: 350,
    rounded: 'md',
    onClick: () => setToggle(!toggle),
  }

  return (
    <Box pos='relative' {...containerProps}>
      <Image src={cover} alt={`${title}`} minH={367} loading='lazy' />
      <RatingBadge badge={badge} />
      <Modal
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        scrollBehavior='inside'
        isCentered
      >
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
            flexWrap='wrap'
          >
            <Text fontWeight='bold'>({year})</Text>
            <RatingBadge badge={badge} inner />
          </Box>
          {genres && <GenreBadges genres={genres} />}
          <DetailTabs cast={cast} crew={crew} description={description} />
        </ModalContent>
      </Modal>
    </Box>
  )
}
