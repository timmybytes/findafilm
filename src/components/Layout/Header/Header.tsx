import {
  Box,
  Heading,
  IconButton,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

export const Header = (): React.ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      d='flex'
      justifyContent='center'
      w='100%'
      alignItems='center'
      p={{ base: 4, md: 8 }}
      mb={10}
    >
      <Box
        as='header'
        d='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
      >
        <Heading hidden>find a film</Heading>
        <Image
          src='/findafilmHeader.svg'
          alt='find-a-film logo'
          maxW={{ base: '270px', sm: '400px' }}
          py={2}
          px={6}
          // pb={0}
        />
        <a href='https://themoviedb.org' target='_blank' rel='noreferrer'>
          <Box d='flex' gridGap={2} justifyContent='center' alignItems='center'>
            <Text whiteSpace='nowrap'>Powered by </Text>
            <Image
              src='/tmdb.svg'
              alt='The Movie Database logo'
              maxH='1.75rem'
            />
          </Box>
        </a>
      </Box>
      <IconButton
        onClick={toggleColorMode}
        aria-label='Color Mode'
        rounded='full'
        icon={colorMode === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
      />
    </Box>
  )
}
