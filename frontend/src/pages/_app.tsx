import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import NotSignInLayout from '@/components/Layout/NotSignInLayout';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#048181',
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
      info: {
        color: "#FF7F56",
      }
    },
  });

  const [isLogin, setIsLogin] = useState(true);

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
