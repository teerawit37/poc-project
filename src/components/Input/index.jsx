import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
export default function Input({ title, type, className, value, onChange }) {
    const [isActive, setIsActive] = useState(false);
    // const [value, setValue] = useState('');
    useEffect(() => {
        if (value !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [value])
    return (
        <div className={`sl-input ${className}`}>
            <input type={type} className='sl-input__box' value={value} onChange={onChange} />
            <label htmlFor={type} className={`sl-input__label ${isActive ? 'sl-input__label--active' : ''}`}>
                {title}
            </label>
        </div>
    )
}