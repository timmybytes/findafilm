import { Box, Text } from '@chakra-ui/react'

export const Footer = (): React.ReactElement => {
  return (
    <Box
      as='footer'
      pos='absolute'
      bottom={0}
      w='100%'
      h={{ base: '80px', sm: '48px' }}
      py={4}>
      <a href='https://timmybytes.com' target='_blank' rel='noreferrer'>
        <Box d='flex' gridGap={2} justifyContent='center' alignItems='center'>
          <Text whiteSpace='nowrap'>
            Built by{' '}
            <Text
              as='a'
              href='https://timmybytes.com'
              target='_blank'
              rel='noopener noreferrer'>
              Timothy Merritt
            </Text>
            ; 2021
          </Text>
        </Box>
      </a>
    </Box>
  )
}
