import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import type { AppProps } from 'next/app'
import { QueueProvider } from '../context/QueueContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider>
      <QueueProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueueProvider>
    </ChakraProvider>
  )
}
export default MyApp
