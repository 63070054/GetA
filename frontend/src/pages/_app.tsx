import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';
import {createTheme} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#048181'
      },
      secondary: {
        main: '#E3F0F0'
      },
      info:{
        main:'#FF7F56'
      }
      
    }
  });

  return (
    <ThemeProvider theme={theme}>
    <AlreadySignInLayout>
      <Component {...pageProps} />
    </AlreadySignInLayout>
    </ThemeProvider>
  )
}
