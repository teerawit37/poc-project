import Button from '../Button/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExclamationOutlined, CloseCircleFilled } from '@ant-design/icons';
import React from 'react';


const PriceList = ({ item, removeObjectFromArray, summary, name }) => {
    const [price, setPrice] = useState(item.money);
    const [prevPrice, setPrevPrice] = useState(item.money);

    const removeItemFromArray = (num, name) => {
        removeObjectFromArray(num, name)
    }
    const onInputChange = (e) => {
        // console.log('after :', e.target.value)
        const value = e.target.value;
        const data = {num: item.num, option: item.option, money: parseInt(value)}
        // console.log(value)
        if (value !== '') {
            // setPrevPrice(parseInt(price));
            summary(data, name);
            setPrice(parseInt(value));
        }
    };


    return (
        <div className='sl-price-list row'>
            <div className='col-2 sl-price-list__item'><CloseCircleFilled onClick={() => removeItemFromArray(item, name)} /></div>
            <div className='col-2 sl-price-list__item'>{item.option}</div>
            <div className='col-2 sl-price-list__item'>{item.num}</div>
            <div className='col-3 sl-price-list__item'>{500}</div>
            <div className='col-3 sl-price-list__item sl-price-list__item--box'>
                <span>฿</span>
                <input
                    type={'number'}
                    value={price}
                    min={5}
                    onChange={onInputChange}
                    className='sl-price-list__box' />
            </div>
        </div>
    );
};

export default PriceList;