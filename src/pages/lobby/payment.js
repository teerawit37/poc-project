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

export default function Payment(user) {
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

    return (
        <div className='sl-payment'>
            <div className="sl-payment__field">
                <div className="sl-payment__board">
                    <div className="sl-payment__header">
                        <div onClick={() => router.back()} className="sl-payment__header-label">
                            <CaretLeftOutlined />
                            <div>หวยรัฐบาลไทย</div>
                        </div>
                        {/* <Button onClick={() => handleToPay('/lobby/thai')}>ชำระเงิน</Button> */}
                    </div>
                    <div className="sl-payment__body">
                        <div className="sl-payment__result">
                            <div className='sl-payment__label-container'>
                                <div className="sl-payment__label">สรุปโพยหวย</div>
                                <div className="sl-payment__label">งวดวันที่ 1 เมษายน 2566</div>
                            </div>
                            <div className='sl-payment__pay'>
                                <div className='sl-payment__price-container'>
                                    <div className='sl-payment__price-header'>
                                        <div>ยอดเล่นหวย</div>
                                        <div>
                                            <span>{totalPrice}</span>
                                            <span className='sl-payment__price-label'>฿</span>
                                        </div>
                                    </div>
                                    <div className='sl-payment__price-footer'>
                                        <div>ยอดเงินที่ต้องชำระ</div>
                                        <div>
                                            <span>{totalPrice}</span>
                                            <span className='sl-payment__price-label'>฿</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sl-payment__bank-container">
                                <div className='sl-payment__bank-block'>
                                    <div className='sl-payment__bank-label'>ชื่อธนาคาร</div>
                                    <div className='sl-payment__bank-value-label'>ธนาคารไทยพาณิชย์</div>
                                </div>
                                <div className='sl-payment__bank-block'>
                                    <div className='sl-payment__bank-label'>เลขบัญชี</div>
                                    <div className='sl-payment__bank-value-label'>293-237945-8</div>
                                </div>
                                <div className='sl-payment__bank-block'>
                                    <div className='sl-payment__bank-label'>ชื่อบัญชี</div>
                                    <div className='sl-payment__bank-value-label'>นาย ณัฐดณิศร์ ศิริพิทยกุล</div>
                                </div>
                            </div>
                            <div className='sl-payment__notics mb-2'>กรุณาใช้ชื่อบัญชีเดียวกันกับชื่อจริงในการโอนเงิน</div>
                            <div className='sl-payment__bank-block-new mb-4'>
                                <input type="file" id="myFile" name="filename" />
                                <div className='sl-payment__bank-button'>
                                    <Button>ส่งสลิป</Button>
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
        const user = decoded.id;
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
