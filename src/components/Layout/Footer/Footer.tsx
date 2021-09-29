import { Box, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'

export const Footer = (): React.ReactElement => {
  return (
    <Box as='footer' pos='absolute' bottom={0} w='100%' h='32px' py={4}>
      <Link href='https://themoviedb.org' passHref>
        <Box
          d='flex'
          gridGap={2}
          justifyContent='center'
          alignItems='center'
          py={4}
        >
          <Text whiteSpace='nowrap'>Built by </Text>
          <Image src='/timmybytes.svg' alt='timmybytes logo' maxH='1.75rem' />
          <Text>&copy; 2021</Text>
        </Box>
      </Link>
    </Box>
  )
}
