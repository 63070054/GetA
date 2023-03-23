import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import NotSignInLayout from '@/components/Layout/NotSignInLayout';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#048181'
      },
      secondary: {
        main: '#E3F0F0'
      },
      info: {
        main: '#FF7F56'
      }
    },
    typography: {
      fontFamily: "Kanit",
    },
  });
  const [isLogin, setIsLogin] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      {isLogin ? (
        <AlreadySignInLayout>
          <Component {...pageProps} />
        </AlreadySignInLayout>
      ) : (
        <NotSignInLayout>
          <Component {...pageProps} />
        </NotSignInLayout>
      )
      }
    </ThemeProvider>
  )
}
