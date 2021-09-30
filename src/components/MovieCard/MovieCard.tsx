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
import { useState } from 'react'
import { useCredits } from '../../hooks/useCredits'
import { useMovie } from '../../hooks/useMovie'
import { coverArt, getYear } from '../../utils/helpers'
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
  const { genres } = useMovie(id)
  const { cast, crew } = useCredits(id)

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

{
  /*
// TODO: Scroll back to top button
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

{scrollPosition > 500 && (<Link href='/#top'>
  <Box position='fixed'
      bottom='20px'
      right={['16px', '84px']}
      zIndex={1}
  >
      <Image src='images/icons/top.svg'
          w='60px'
          h='60px'
      />
  </Box>
</Link>)}
 */
}
