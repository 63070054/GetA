import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AlreadySignInLayout from './../components/Layout/AlreadySignInLayout';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AlreadySignInLayout>
      <Component {...pageProps} />
    </AlreadySignInLayout>
  )
}
