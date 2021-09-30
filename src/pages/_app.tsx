import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import type { AppProps } from 'next/app'
import { QueueProvider } from '../context/QueueContext'
import '../styles/globals.scss'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// 3. extend the theme
export const theme = extendTheme({ config })

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
