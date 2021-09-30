import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { theme } from '@theme/index'
import type { AppProps } from 'next/app'
import { QueueProvider } from '../context/QueueContext'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <QueueProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueueProvider>
    </ChakraProvider>
  )
}
export default MyApp
