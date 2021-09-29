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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
}: MovieCardProps): React.ReactElement => {
  const [toggle, setToggle] = useState(false)
  const cover = coverArt(image, title)
  const year = getYear(date)
  const rating = parseFloat(badge)
  const ratingInfo = getRatingColor(rating)

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
          <Tabs variant='enclosed' py={4}>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Cast</Tab>
              <Tab>Crew</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>{description || 'No description available'}</Text>
              </TabPanel>
              {cast && (
                <TabPanel>
                  {' '}
                  <CastTable cast={cast} />
                </TabPanel>
              )}
              {crew && (
                <TabPanel>
                  {' '}
                  <CrewTable crew={crew} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
          {/*
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
           */}
        </ModalContent>
      </Modal>
    </Box>
  )
}
