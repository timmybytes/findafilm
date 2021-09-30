import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const styles = {
  global: {
    body: {
      // bg: 'blackAlpha.900', TODO: Set Light/Dark palettes
      // color: 'white',
    },
    a: {
      color: 'teal.500',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
}

const config: ThemeConfig = {
  // initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  styles,
})
