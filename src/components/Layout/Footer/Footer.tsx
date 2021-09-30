import { Box, Image, Text } from '@chakra-ui/react'

export const Footer = (): React.ReactElement => {
  return (
    <Box
      as='footer'
      pos='absolute'
      bottom={0}
      w='100%'
      h={{ base: '80px', sm: '48px' }}
      py={4}
    >
      <Box
        d='flex'
        flexDir={{ base: 'column', sm: 'row' }}
        justifyContent='space-evenly'
        alignItems='center'
      >
        <a href='https://timmybytes.com' target='_blank' rel='noreferrer'>
          <Box d='flex' gridGap={2} justifyContent='center' alignItems='center'>
            <Text whiteSpace='nowrap'>Built by </Text>
            <Image src='/timmybytes.svg' alt='timmybytes logo' maxH='1.75rem' />
            <Text>&copy; 2021</Text>
          </Box>
        </a>
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
    </Box>
  )
}
