import { Box } from '@chakra-ui/react'

type HeaderProps = {
  children?: React.ReactNode
}

export const Header = ({
  children,
  ...rest
}: HeaderProps): React.ReactElement => {
  return <Box {...rest}>{children}</Box>
}
