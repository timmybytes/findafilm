import {
  Badge,
  Box,
  Button,
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const year = date.slice(0, 4)
  const rating = parseFloat(badge)
  const ratingInfo = getRatingColor(rating)

  return (
    <Box overflow='hidden' shadow='xl' position='relative' maxW={350}>
      {/* Cover Art */}
      <Image
        src={image}
        alt='MovieCard Image'
        fallbackSrc='https://via.placeholder.com/350x500.webp?text=No+Cover+Art'
        minH={367}
      />
      {/* Meta Data */}
      <Box
        d='grid'
        gridTemplateRows='minmax(48px, min-content)'
        justifyContent='stretch'
        alignItems='stretch'
        w='100%'
        h='100%'
        // Expand movie description when toggled
        // sx={
        //   toggle
        //     ? {
        //         // Prevent transparent bg bleed with expaned description
        //         // background: colorMode === 'dark' ? 'grey.800' : 'white',
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         h: '100%',
        //       }
        //     : {}
        // }
      >
        <Badge
          // color={toggle ? 'white' : 'black'}
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
          // bg={toggle ? (colorMode === 'dark' ? 'gray.800' : 'white') : ''}
        >
          <Text as='h2' fontWeight={700} fontSize='2xl' lineHeight='1.2' py={4}>
            {title}
          </Text>
          <Text>{year}</Text>
          {/* <Box>
            <Text
              // color={toggle ? (colorMode === 'dark' ? 'white' : 'black') : ''}
              fontWeight={400}
              minH={100}
              // h={toggle ? 'auto' : 100}
              // overflow={toggle ? 'auto' : 'hidden'}
              pb='45px'
              maxH='54px'>
              {description || 'No description available'}
            </Text>
          </Box> */}
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
      <Modal
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        scrollBehavior='inside'
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Box p={4}>
            <Image
              src={image}
              alt='MovieCard Image'
              fallbackSrc='https://via.placeholder.com/350x500.webp?text=No+Cover+Art'
            />
            <Heading as='h2' py={4}>
              {title}
            </Heading>
            <Box
              d='flex'
              justifyContent='flex-start'
              alignItems='center'
              gridGap={2}>
              <Text fontWeight='bold'>({year || 'No year available'})</Text>
              <Badge colorScheme={ratingInfo.color}>
                {rating || 'No rating available'}
              </Badge>
            </Box>
            <Text>{description || 'No description available'}</Text>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}
