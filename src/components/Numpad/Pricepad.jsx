import React, { useState, useRef } from 'react';
import { Checkbox } from 'antd';
import Button from "../Button/Button"
export default function PricePad({ submit }) {
    return (
        <div className="sl-pricepad">
            <div className="sl-pricepad__num-container">
                <div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-pricepad__num' >1</button>
                        <button className='sl-pricepad__num' >2</button>
                        <button className='sl-pricepad__num' >3</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-pricepad__num' >4</button>
                        <button className='sl-pricepad__num' >5</button>
                        <button className='sl-pricepad__num' >6</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-pricepad__num' >7</button>
                        <button className='sl-pricepad__num' >8</button>
                        <button className='sl-pricepad__num' >9</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-pricepad__num sl-pricepad__num--deactive'></button>
                        <button className='sl-pricepad__num'>0</button>
                        <button className='sl-pricepad__num'>ลบ</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}