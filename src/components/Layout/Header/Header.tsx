import { Box, Heading, Image } from '@chakra-ui/react'

export const Header = (): React.ReactElement => {
  return (
    <Box
      as='header'
      d='flex'
      flexDir='column'
      justifyContent='center'
      alignItems='center'
    >
      <Heading
        textAlign='center'
        fontSize={['3rem', '4rem']}
        py={10}
        px={2}
        textTransform='lowercase'
        hidden
      >
        find a film
      </Heading>
      <Image
        src='/findafilmHeader.svg'
        alt='find-a-film logo'
        maxW={{ base: '300px', sm: '400px' }}
        p={10}
      />
    </Box>
  )
}
