import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';
import { createTheme } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import NotSignInLayout from '@/components/Layout/NotSignInLayout';
import api, { AxiosInterceptor } from './../plugins/axios/api';
import Cookies from "js-cookie"
import { useRouter } from 'next/router';
import LoadingScreen from '@/components/Loading/LoadingScreen';

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
      },
    },
    typography: {
      fontFamily: "Kanit",
      info: {
        color: "#FF7F56",
      },
      primary: {
        color: "#103535"
      }
    },
  });

  const router = useRouter()

  useEffect(() => {
    api.interceptors.response.use(
      function (response) {
        setIsLoading(false);
        return response;
      },
      function (error) {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    api.interceptors.request.use(
      function (config) {
        const token = Cookies.get("token");

        if (token) {
          config.headers["Authorization"] = token;
        }
        setIsLoading(true);

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <AxiosInterceptor {...{ setIsLoading }}>
        {(isLogin) ? (
          <AlreadySignInLayout>
            <Component {...pageProps} />
          </AlreadySignInLayout>
        ) : (
          <NotSignInLayout>
            <Component {...pageProps} />
          </NotSignInLayout>
        )
        }
        {isLoading && <LoadingScreen {...{ isLoading, setIsLoading }} />}
      </AxiosInterceptor>
    </ThemeProvider>
  )
}
