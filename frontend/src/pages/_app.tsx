import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';
import NotSignInLayout from '@/components/Layout/NotSignInLayout';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
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
    </>
  )
}
