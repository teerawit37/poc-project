// import '@/styles/globals.css';
import '../styles/scss/main.scss';
import NavBar from '../components/NavBar';

import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NavBar></NavBar>
      <Component {...pageProps} />
      <Footer></Footer>
    </SessionProvider>
  )
}

