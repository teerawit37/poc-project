import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import { FacebookOutlined } from '@ant-design/icons';
import LineIcon from '../Button/LineIcon'
export default function Lotto() {

    const data = {
        top3: ['907'],
        todd: ['079', '097', '709', '790', '907', '970'],
        top2: ['07'],
        bott2: ['99'],
        bott3: ['111', '914', '290', '698']
    }
    return (
        <div className="sl-lotto">
            <div className='container'>
                <div className='sl-lotto__app-container'>
                    <div className='sl-lotto__header'>ผลรางวัลย้อนหลัง</div>
                    <div className='sl-lotto__container'>
                        <div className='sl-lotto__sub-header'>งวดวันที่ 1 เมษายน 2566</div>

                        <div className='sl-lotto__result-container'>
                            <div className='sl-lotto__text-label'>3 ตัวบน</div>
                            <div className='sl-lotto__num-container'>
                                {data.top3.map((item) => (
                                    <div className='sl-lotto__num-label'>{item}</div>
                                ))}
                            </div>
                        </div>

                        <div className='sl-lotto__result-container'>
                            <div className='sl-lotto__text-label'>โต๊ด</div>
                            <div className='sl-lotto__num-container'>
                                {data.todd.map((item) => (
                                    <div className='sl-lotto__num-label'>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className='sl-lotto__result-container'>
                            <div className='sl-lotto__text-label'>2 ตัวบน</div>
                            <div className='sl-lotto__num-container'>
                                {data.top2.map((item) => (
                                    <div className='sl-lotto__num-label'>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className='sl-lotto__result-container'>
                            <div className='sl-lotto__text-label'>2 ตัวล่าง</div>
                            <div className='sl-lotto__num-container'>

                                {data.bott2.map((item) => (
                                    <div className='sl-lotto__num-label'>{item}</div>
                                ))}
                            </div>
                        </div>
                        <div className='sl-lotto__result-container'>
                            <div className='sl-lotto__text-label'>3 ตัวล่าง</div>
                            <div className='sl-lotto__num-container'>

                                {data.bott3.map((item) => (
                                    <div className='sl-lotto__num-label'>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}