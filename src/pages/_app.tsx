import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { theme } from '@theme/index'
import type { AppProps } from 'next/app'
import { DataProvider } from '@context/DataContext'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </ChakraProvider>
  )
}
export default MyApp
