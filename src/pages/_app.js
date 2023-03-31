// import '@/styles/globals.css';
import '../styles/scss/main.scss';
import NavBar from '../components/NavBar';
import NavbarNoAuth from '../components/NavBar/NavbarNoAuth';
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"
import Footer from '@/components/Footer';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  console.log(router.pathname)
  const path = [
    "/signin", "/signup/verify", "/signup", "/signup/waiting"
  ]
  const renderNavBar = () => {
    if (path.includes(router.pathname)) {
      return (
        <NavbarNoAuth></NavbarNoAuth>
      )
    } else {
      return (
        <NavBar></NavBar>
      )
    }
  }
  return (
    <SessionProvider session={session}>
      {renderNavBar()}
      <Component {...pageProps} />
      <Footer></Footer>
    </SessionProvider>
  )
}

