import { useRouter } from 'next/router'
import Button from "@/components/Button/Button"
import React, { useState, useRef, useEffect } from 'react';
import NumpadV1 from "@/components/Numpad/NumpadV1";
import NumpadV2 from "@/components/Numpad/NumpadV2";
import NumpadV3 from "@/components/Numpad/NumpadV3";
import { Radio, Tabs } from 'antd';
import { CaretLeftOutlined, CloseCircleFilled } from '@ant-design/icons';

export default function FillNumber() {
    const [number, setNumber] = useState([]);
    const [number2, setNumber2] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem("LOTTO-LIST");
            const initialValue = JSON.parse(saved);
            // setNumber(initialValue);
            if (initialValue !== null) {
                if (initialValue.length > 0) {
                    setNumber(initialValue);
                }
            } else {
                setNumber([]);
            }
        }
    }, [router.pathname])

    const handleSetPrice = (path) => {
        if (number.length !== 0) {
            localStorage.setItem("LOTTO-LIST", JSON.stringify(number))
            router.push(path)
        }
    }
    // const addNumber = (num, name) => {
    //     const children = number.concat(num);
    //     setNumber(children)
    // }
    const combineNumbersAndName = (numbers, name) => {
        const existingItem = number.find(item => item.customer === name);
        if (existingItem) {
            for (var i = 0; i < numbers.length; ++i) {
                const newNumber = { num: numbers[i].num, option: numbers[i].option, money: numbers[i].money };
                existingItem.num.push(newNumber);
            }
        } else {
            const newItem = { customer: name, num: numbers };
            number.push(newItem);
        }
        setNumber([...number]);
    };


    const menu = [
        {
            title: '3 ตัว',
            content: <NumpadV1 submit={combineNumbersAndName}></NumpadV1>
        },
        {
            title: '2 ตัว',
            content: <NumpadV2 submit={combineNumbersAndName}></NumpadV2>
        },
        // {
        //     title: '1 ตัว',
        //     content: <NumpadV3 submit={combineNumbersAndName}></NumpadV3>
        // },
    ]
    
    const removeObjectFromArray = (name, value) => {
        setNumber(prevNumber => {
          const newData = prevNumber.map(obj => {
            if (obj.customer === name) {
              const newList = obj.num.filter(obj => obj.num !== value.num || obj.option !== value.option);
              return {...obj, num: newList};
            }
            return obj;
          });
          return newData;
        });
      };


    // const renderNumList = () => {
    //     return (
    //         <div className='sl-num-list'>
    //             {number.map((num) => (
    //                 <div className='sl-num-list__items row' key={`key-${num.num}-${num.option}`}>
    //                     <div className='col-3 sl-num-list__item'><CloseCircleFilled onClick={() => removeObjectFromArray(num)} /></div>
    //                     <div className='col-3 sl-num-list__item'>{num.option}</div>
    //                     <div className='col-6 sl-num-list__item'>{num.num}</div>
    //                 </div>
    //             ))}
    //         </div>
    //     )
    // }

    const renderNumList = () => {
        return (
            <div className='sl-num-list'>
                {number.map((item) => (
                    <div key={item.customer}>
                        <div className='sl-num-list__name-title mt-2'>{item.customer}</div>
                        {item.num.map((num) => (
                            <div className='sl-num-list__items row' key={`key-${num.num}-${item.customer}`}>
                                <div className='col-3 sl-num-list__item'><CloseCircleFilled onClick={() => removeObjectFromArray(item.customer, num)} /></div>
                                <div className='col-3 sl-num-list__item'>{num.option}</div>
                                <div className='col-6 sl-num-list__item'>{num.num}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='sl-fill-number'>
            <div className="sl-fill-number__field">
                <div className="sl-fill-number__board">
                    <div className="sl-fill-number__header">
                        <div onClick={() => router.back()} className="sl-fill-number__header-label">
                            <CaretLeftOutlined />
                            <div>หวยรัฐบาลไทย</div>
                        </div>
                        <Button onClick={() => handleSetPrice('/lobby/fill-price')}>ใส่จำนวนเงิน</Button>
                    </div>
                    <div className="sl-fill-number__body">
                        <div className="sl-fill-number__result">
                            {number.length > 0 ? (
                                renderNumList()
                            ) : (
                                <div className="sl-fill-number__notics-container">
                                    <div className="sl-fill-number__notics">คุณยังไม่มีหวยเลย!</div>
                                </div>
                            )}
                        </div>
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            size={'large'}
                            items={menu.map((item, i) => {
                                return {
                                    label: item.title,
                                    key: i,
                                    children: item.content,
                                };
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
