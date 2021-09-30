import { Flex } from '@chakra-ui/react'
import { Footer } from '@components/Layout/Footer'
import { Header } from '@components/Layout/Header'
import { Main } from '@components/Layout/Main'

type LayoutProps = {
  children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <Flex
      direction='column'
      align='center'
      m='0 auto'
      minH='100vh'
      height='98%'
      position='relative'
    >
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Flex>
  )
}
