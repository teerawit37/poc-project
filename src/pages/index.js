import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
// import LoginButton from '../components/Button/LoginBtn';
import { useSession } from "next-auth/react"
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import BannerTop from '../components/NavBar/BannerTop';
import Button from '@/components/Button/Button';
import Lotto from '@/components/Lotto'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path)
  }
  return (
    <>
      <Head>
        <title>911Superlucky</title>
        <meta name="description" content="หวยออนไลน์ต้อง 911Superlucky" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="sl-home">
        <BannerTop></BannerTop>
        <Lotto></Lotto>
        <div className='sl-home__banner'>
          <div className='container'>
            <div className='sl-home__head-container'>
              <div className='sl-home__head'>ซื้อหวยออนไลน์ง่ายๆ</div>
              <div className='sl-home__head'>สะดวกปลอดภัย ได้เงินไว</div>
              <div className='sl-home__head'>ส่วนลดเยอะ ซื้อเลย คลิ๊ก</div>
              
              <div className='mt-2'>
              <Button onClick={() => handleClick('/lobby/thai')}>เริ่มเล่นหวยออนไลน์</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='sl-home__banner sl-home__banner--new'>
          <div className='container'>
            <div className='sl-home__head-container'>
              <div className='sl-home__head'>สนใจสมัครตัวแทน ทำงานออนไลน์</div>
              <div className='sl-home__head'>อยากหารายได้เสริมหรือรายได้หลัก</div>
              <div className='sl-home__head'>ไม่ต้องใช้เงินลงทุน</div>
              <div className='sl-home__head'>ดูรายละเอียดเพิ่มเติม คลิ๊ก</div>
              <div className='mt-2'>
              <Button onClick={() => handleClick('/lobby/thai')}>สมัครตัวแทน</Button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='container'>
          test
        </div> */}
      </main>
    </>
  )
}
