import Button from '@/components/Button/Button';
import PriceList from '@/components/List/PriceList';
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { Radio, Tabs } from 'antd';
import { useRouter } from 'next/router'
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { CaretLeftOutlined, CloseCircleFilled } from '@ant-design/icons';

export default function FillPrice(user) {
    const { data: session } = useSession()
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(0)
    const [number, setNumber] = useState([])

    console.log(user)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem("LOTTO-LIST");
            // console.log(saved)
            const initialValue = JSON.parse(saved);
            // console.log(initialValue)
            if (initialValue !== null) {
                if (initialValue.length > 0) {
                    setTotalPrice(5 * initialValue.length)
                    setNumber(initialValue);
                }
            } else {
                setTotalPrice(0)
            }
        }
    }, [router.pathname])

    const removeObjectFromArray = (value, name) => {
        setNumber(prevNumber => {
            const newData = prevNumber.map(obj => {
                if (obj.customer === name) {
                    console.log('pass')
                    const newList = obj.num.filter(obj => obj.num !== value.num || obj.option !== value.option);
                    return { ...obj, num: newList };
                }
                return obj;
            });

            return newData;
        });
    };

    const updateObject = (newValue, name) => {
        setNumber(prevNumber => {
            return prevNumber.map(obj => {
                if (obj.customer !== name) {
                    return obj;
                }

                const updatedNum = obj.num.map(item => {
                    if (item.num === newValue.num && item.option === newValue.option) {
                        return { ...item, money: newValue.money };
                    }
                    return item;
                });

                return { ...obj, num: updatedNum };
            });
        });
    };


    // const updateObject = (newValue) => {
    //     const updatedData = number.map(item => {
    //         if (item.num === newValue.num && item.option === newValue.option) {
    //             item.money = newValue.money;
    //         }
    //         return item;
    //     });
    //     setNumber(updatedData)
    // }


    useEffect(() => {
        console.log(number)
        // const summary = number.reduce((acc, curr) => acc + curr.money, 0);
        let summary = 0;
        number.map(obj => {
            summary += obj.num.reduce((acc, curr) => acc + curr.money, 0);
        })
        setTotalPrice(summary)
    }, [number])

    const summary = (value, name) => {
        updateObject(value, name)
    }

    const renderNumList = () => {
        return (
            <div className='sl-num-list sl-num-list--price'>
                {number.map((item) => (
                    <div key={item.customer}>
                        <div className='sl-num-list__name-title mt-2'>{item.customer}</div>
                        {item.num.map((num) => (
                            <PriceList
                                key={`key-${num.num}-${num.option}`}
                                removeObjectFromArray={removeObjectFromArray}
                                name={item.customer}
                                item={num}
                                summary={summary}
                            ></PriceList>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    // const renderNumList = () => {
    //     return (
    //         <div className='sl-num-list sl-num-list--price'>
    //             {number.map((num) => (
    //                 <PriceList
    //                     key={`key-${num.num}-${num.option}`}
    //                     removeObjectFromArray={removeObjectFromArray}
    //                     item={num}
    //                     summary={summary}
    //                 ></PriceList>
    //             ))}
    //         </div>
    //     )
    // }

    const handleCheckBill = (path) => {
        if (number.length !== 0) {
            localStorage.setItem("LOTTO-LIST", JSON.stringify(number))
            router.push(path)
        }
    }

    const letDelAll = () => {
        setNumber([]);
        setTotalPrice(0)
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('LOTTO-LIST');
        }
    }

    return (
        <div className='sl-fill-price'>
            <div className="sl-fill-price__field">
                <div className="sl-fill-price__board">
                    <div className="sl-fill-price__header">
                        <div onClick={() => router.back()} className="sl-fill-price__header-label">
                            <CaretLeftOutlined />
                            <div>{`฿${totalPrice}`}</div>
                        </div>
                        <Button onClick={() => handleCheckBill('/lobby/summary')}>ส่งโพยหวย</Button>
                    </div>
                    <div className="sl-fill-price__body">
                        <div className="sl-fill-price__result">
                            <div className='sl-fill-price__items'>
                                <div className='col-2 sl-fill-price__item'></div>
                                <div className='col-2 sl-fill-price__item'></div>
                                <div className='col-2 sl-fill-price__item'>เลขหวย</div>
                                <div className='col-3 sl-fill-price__item'>อัตราจ่าย</div>
                                <div className='col-3 sl-fill-price__item sl-fill-price__item--box'>จำนวนเงิน</div>
                            </div>
                            {number.length > 0 ? (
                                renderNumList()
                                // <div>2</div>
                            ) : (
                                <div className="sl-fill-price__notics-container">
                                    <div className="sl-fill-price__notics">คุณยังไม่มีหวยเลย!</div>
                                    <div className='mt-2'>
                                        <Button onClick={() => router.back()}>เพิ่มเลขหวย</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <PricePad></PricePad> */}
                        <div className='d-flex justify-content-center'>
                            <div className="sl-fill-price__btn-container">
                                <Button type="secondary" onClick={letDelAll}>ลบเลขทั้งหมด</Button>
                                <Button type="secondary" >ใส่เงินเท่ากันทุกเลข</Button>
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
