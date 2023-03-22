import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/system'


export default function App({ Component, pageProps }: AppProps) {

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
