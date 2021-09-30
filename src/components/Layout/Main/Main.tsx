import { Box } from '@chakra-ui/react'

type MainProps = {
  children?: React.ReactNode
}

export const Main = ({ children }: MainProps): React.ReactElement => {
  return (
    <Box as='main' w='100%' mb={{ base: '80px', sm: '48px' }}>
      {children}
    </Box>
  )
}
