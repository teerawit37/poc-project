import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Lobby from '../../components/Lobby/Lobby';
import Button from '@/components/Button/Button';
import PriceList from '@/components/List/PriceList';
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { Radio, Tabs } from 'antd';
import { useRouter } from 'next/router'
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { CaretLeftOutlined, CloseCircleFilled } from '@ant-design/icons';

export default function Summary(user) {
    const { data: session } = useSession()
    const router = useRouter();
    const [number, setNumber] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem("LOTTO-LIST");
            const initialValue = JSON.parse(saved);
            if (initialValue !== null) {
                if (initialValue.length > 0) {
                    setNumber(initialValue);
                    let summary = 0;
                    const data = initialValue
                    initialValue.map(obj => {
                        summary += obj.num.reduce((acc, curr) => acc + curr.money, 0);
                    })
                    // const summary = initialValue.reduce((acc, curr) => acc + curr.money, 0);
                    setTotalPrice(summary)
                }
            }
        }
    }, [router.pathname])

    const setupNumber = () => {
    const data = number.map(({ customer, num }) => ({
      customer: customer,
      datetime: new Date().toLocaleString(),
      num: num.map(({ num, option, money }) => ({
        number: num,
        option: option,
        money: money,
        reward: money * 5,
      })),
    }));
    // console.log(data);
    localStorage.setItem("MY-LOTTO-LIST", JSON.stringify(data))
  }

    const handleToPay = (path) => {
        if (number.length !== 0) {
            setupNumber();
            // localStorage.setItem("MY-LOTTO-LIST", JSON.stringify(number))
            // localStorage.removeItem('LOTTO-LIST');
            router.push(path)
        }
    }

    return (
        <div className='sl-summary'>
            <div className="sl-summary__field">
                <div className="sl-summary__board">
                    <div className="sl-summary__header">
                        <div onClick={() => router.back()} className="sl-summary__header-label">
                            <CaretLeftOutlined />
                            <div>หวยรัฐบาลไทย</div>
                        </div>
                        <Button onClick={() => handleToPay('/lobby/payment')}>ชำระเงิน</Button>
                    </div>
                    <div className="sl-summary__body">
                        <div className="sl-summary__result">
                            <div className='sl-summary__label-container'>
                                <div className="sl-summary__label">สรุปโพยหวย</div>
                                <div className="sl-summary__label">งวดวันที่ 1 กุมภาพันธ์ 2566</div>
                            </div>
                            <div className='sl-summary__pay'>
                                <div className='sl-summary__price-container'>
                                    <div className='sl-summary__price-header'>
                                        <div>ยอดเล่นหวย</div>
                                        <div>
                                            <span>{totalPrice}</span>
                                            <span className='sl-summary__price-label'>฿</span>
                                        </div>
                                    </div>
                                    <div className='sl-summary__price-header'>
                                        <div>ส่วนลด</div>
                                        <div>
                                            <span>{totalPrice*0.05}</span>
                                            <span className='sl-payment__price-label'>฿</span>
                                        </div>
                                    </div>
                                    <div className='sl-summary__price-footer'>
                                        <div>ยอดเงินที่ต้องชำระ</div>
                                        <div>
                                            <span>{totalPrice - (totalPrice*0.05)}</span>
                                            <span className='sl-summary__price-label'>฿</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sl-summary__container'>
                                <div className="sl-summary__label mb-2">เลขหวย</div>
                                {number.length > 0 ? (
                                    number.map((item) => (
                                        <div key={item.customer}>
                                            <div className='sl-summary__name-title mt-2'>{item.customer}</div>
                                            <div className='row'>
                                                <div className='col-3 sl-summary__label-fit'>เลขหวย</div>
                                                <div className='col-3 sl-summary__label-fit'>อัตราจ่าย</div>
                                                <div className='col-3 sl-summary__label-fit'>จำนวนเงินเล่น</div>
                                                <div className='col-3 sl-summary__label-fit'>ถูกรางวัลได้</div>
                                            </div>
                                            {item.num.map((num) => (
                                                <div className='row sl-summary__list' key={`key-${num.num}-${num.option}`}>
                                                    <div className='col-3 sl-summary__label-list sl-summary__label-list--between'>
                                                        <span>{num.option}</span>
                                                        <span className='sl-summary__label-list--bold'>{num.num}</span>
                                                    </div>
                                                    <div className='col-3 sl-summary__label-list'>{500}</div>
                                                    <div className='col-3 sl-summary__label-list'>
                                                        <span className='sl-summary__label-list--bold'>{num.money}</span>
                                                        <span className='sl-summary__label-list--non-hl'>฿</span>
                                                    </div>
                                                    <div className='col-3 sl-summary__label-list'>
                                                        <span className='sl-summary__label-list--hl'>{num.money * 500}</span>
                                                        <span className='sl-summary__label-list--non-hl'>฿</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className="sl-summary__notics-container">
                                        <div className="sl-summary__notics">คุณยังไม่มีหวยเลย!</div>
                                        <div className='mt-2'>
                                            <Button onClick={() => router.back()}>เพิ่มเลขหวย</Button>
                                        </div>
                                    </div>
                                )}
                                <div className='d-flex justify-content-center'>
                                    <div className='sl-summary__btn-container'>
                                        <Button onClick={() => handleToPay('/lobby/payment')}>ชำระเงิน</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const accessToken = cookies.accessToken;

    if (!accessToken || !session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = decoded;

        return {
            props: {
                user,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

}
