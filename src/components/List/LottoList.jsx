import Button from '../Button/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExclamationOutlined, CloseCircleFilled } from '@ant-design/icons';
import React from 'react';


const LottoList = ({ item }) => {
    const router = useRouter();
    console.log(item)
    const handleClick = (path) => {
        router.push(path)
    }
    return (
        <div className='sl-lotto-list row'>
            {item.length > 0 ? (
                // <div>test</div>
                item.map((data) => (
                    <div className='sl-lotto-list__card' key={item.customer}>
                        <div className='sl-lotto-list__title mt-2'>
                            <div className='sl-lotto-list__date-title'>{data.datetime}</div>
                            <div className='sl-lotto-list__name-title'>{data.customer}</div>
                        </div>
                        <div className='row'>
                            <div className='col-4 sl-lotto-list__label-fit'>เลขหวย</div>
                            <div className='col-5 sl-lotto-list__label-fit'>จำนวนเงินเล่น</div>
                            <div className='col-3 sl-lotto-list__label-fit'>ถูกรางวัลได้</div>
                        </div>


                        {data.num.map((num) => (
                            <div key={`key-lotto-${num.number}-${num.option}`} className='row'>
                                <div className='col-4 sl-lotto-list__item sl-lotto-list__item-between'>
                                    <span>{num.option}</span>
                                    <span>{num.number}</span>
                                </div>
                                <div className='col-5 sl-lotto-list__item'>
                                    <span>{num.money}</span>
                                    <span className='sl-lotto-list__bath'>฿</span>
                                </div>
                                <div className='col-3 sl-lotto-list__item'>
                                    <span>{num.reward}</span>
                                    <span className='sl-lotto-list__bath'>฿</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))

            ) : (
                <div className="sl-lotto-list__notics-container">
                    <div className="sl-lotto-list__notics">คุณยังไม่มีหวยเลย!</div>
                    <div className='mt-2'>
                        <Button onClick={() => handleClick('/lobby/fill-number')}>เล่นหวยเลย</Button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LottoList;