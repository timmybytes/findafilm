import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueueProvider } from '../context/QueueContext'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider>
      <QueueProvider>
        <Component {...pageProps} />
      </QueueProvider>
    </ChakraProvider>
  )
}
export default MyApp
