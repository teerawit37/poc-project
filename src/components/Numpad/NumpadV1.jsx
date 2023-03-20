import React, { useState, useRef, useEffect } from 'react';
import { Checkbox, Modal } from 'antd';
import Button from "../Button/Button"
import { useSession, signIn, signOut } from "next-auth/react"
import Input from '../Input';

export default function Numpad({ submit }) {
    const [customer, setCustomer] = useState([]);
    const [customerPick, setCustomerPick] = useState('');
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();

    const [phoneNumber, setPhoneNumber] = useState(['', '', '']);
    const [options, setOptions] = useState([]);
    const [permut, setPermut] = useState(false);
    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    const thirdInputRef = useRef(null);

    const handleClick = (e) => {
        const number = e.target.innerText;
        if (phoneNumber[0].length < 1) {
            setPhoneNumber([number, phoneNumber[1], phoneNumber[2]]);
            firstInputRef.current.focus();
        } else if (phoneNumber[1].length < 1) {
            setPhoneNumber([phoneNumber[0], number, phoneNumber[2]]);
            secondInputRef.current.focus();
        } else if (phoneNumber[2].length < 1) {
            setPhoneNumber([phoneNumber[0], phoneNumber[1], number]);
            thirdInputRef.current.focus();
        }
    }

    const handleDelete = () => {
        if (phoneNumber[2].length === 1) {
            setPhoneNumber([phoneNumber[0], phoneNumber[1], '']);
            thirdInputRef.current.focus();
        } else if (phoneNumber[1].length === 1) {
            setPhoneNumber([phoneNumber[0], '', '']);
            secondInputRef.current.focus();
        } else if (phoneNumber[0].length === 1) {
            setPhoneNumber(['', '', '']);
            firstInputRef.current.focus();
        }
    }

    const permuteOptions = (options, number, permute) => {
        var results = [];

        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            if (permute && option !== 'โต๊ด') {
                var permutations = permuteNumber(number);
                for (var j = 0; j < permutations.length; j++) {
                    results.push({ num: permutations[j], option: option, money: 5 });
                }
            } else {
                results.push({ num: number, option: option, money: 5 });
            }
        }
        return results;
    }

    const permuteNumber = (num) => {
        var results = [];
        if (num.length === 1) {
            results.push(num);
            return results;
        }
        for (var i = 0; i < num.length; i++) {
            var firstChar = num[i];
            var charsLeft = num.substring(0, i) + num.substring(i + 1);
            var innerPermutations = permuteNumber(charsLeft);
            for (var j = 0; j < innerPermutations.length; j++) {
                results.push(firstChar + innerPermutations[j]);
            }
        }
        return results;
    }

    const submitNumber = (name) => {
        // console.log(name)
        const num = phoneNumber.join('')
        if (num !== '' || options.length !== 0) {
            submit(permuteOptions(options, num, permut), name)
            setPhoneNumber(['', '', ''])
        }
    }

    const onChange = (e) => {
        setPermut(e.target.checked);
    };

    const handleOptionChange = (value) => {
        const selectedOption = value;

        if (options.includes(selectedOption)) {
            setOptions(options.filter(o => o !== selectedOption));
        } else {
            setOptions([...options, selectedOption]);
        }
    }

    const handleAddNumber = () => {
        if (session) {
            if (session.type === 'seller') {
                showModal()
                return
            }
        }
        submitNumber();
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClickName = (name) => {
        if (customerPick === name) {
            setCustomerPick('');
        } else {
            setCustomerPick(name);
        }
    }

    useEffect(() => {
        if(customerPick !== ''){
            setName('')
        }
    }, [customerPick])

    const handleOk = () => {
        if (name !== '') {
            let data = name
            setCustomer([...customer, data]);
            submitNumber(name)
            setName('')
            setIsModalOpen(false);
            return
        }
        if (customerPick === '') {
            alert('โปรดเพิ่มชื่อลุกค้า')
        } else {
            submitNumber(customerPick)
            setIsModalOpen(false);
            return
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="sl-numpad">
            <div className="sl-numpad__option-container gap-1">
                <div className={`sl-numpad__option ${options.includes('บน') && 'sl-numpad__option--active'}`} onClick={() => handleOptionChange('บน')}>บน</div>
                <div className={`sl-numpad__option ${options.includes('โต๊ด') && 'sl-numpad__option--active'}`} onClick={() => handleOptionChange('โต๊ด')}>โต๊ด</div>
                <div className={`sl-numpad__option ${options.includes('ล่าง') && 'sl-numpad__option--active'}`} onClick={() => handleOptionChange('ล่าง')}>ล่าง</div>
            </div>
            <div className="sl-numpad__num-container">
                <div>
                    <div className='d-flex justify-content-center'>
                        <div className='sl-numpad__num-box gap-1 my-2'>
                            <input ref={firstInputRef} type="text" className='sl-numpad__box' value={phoneNumber[0]} maxLength="1" readOnly />
                            <input ref={secondInputRef} type="text" className='sl-numpad__box' value={phoneNumber[1]} maxLength="1" readOnly />
                            <input ref={thirdInputRef} type="text" className='sl-numpad__box' value={phoneNumber[2]} maxLength="1" readOnly />
                        </div>

                    </div>
                    <div className='d-flex justify-content-end'>
                        <Checkbox className='sl-numpad__checkbox' checked={permut} onChange={onChange}>
                            กลับเลข
                        </Checkbox>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-numpad__num' onClick={handleClick}>1</button>
                        <button className='sl-numpad__num' onClick={handleClick}>2</button>
                        <button className='sl-numpad__num' onClick={handleClick}>3</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-numpad__num' onClick={handleClick}>4</button>
                        <button className='sl-numpad__num' onClick={handleClick}>5</button>
                        <button className='sl-numpad__num' onClick={handleClick}>6</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-numpad__num' onClick={handleClick}>7</button>
                        <button className='sl-numpad__num' onClick={handleClick}>8</button>
                        <button className='sl-numpad__num' onClick={handleClick}>9</button>
                    </div>
                    <div className='d-flex gap-1 my-1'>
                        <button className='sl-numpad__num' onClick={() => setPhoneNumber(['', '', ''])}>ล้าง</button>
                        <button className='sl-numpad__num' onClick={handleClick}>0</button>
                        <button className='sl-numpad__num' onClick={() => handleDelete()}>ลบ</button>
                    </div>
                    <div>


                    </div>
                </div>
            </div>
            <div className="py-3 w-100 d-flex justify-content-center">
                <div className="sl-numpad__btn-container">
                    <Button type="secondary" onClick={() => handleAddNumber()}>เพิ่มเลข</Button>
                </div>
            </div>
            <Modal className='sl-modal' title="ลูกค้า" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input title="เพิ่มลูกค้า" value={name} type="text" onChange={handleNameChange} className="mb-3"></Input>
                {customer.map((item) => (
                    <div
                        key={item}
                        className={`sl-modal__card ${customerPick === item ? 'sl-modal__card--active' : ''}`}
                        onClick={() => handleClickName(item)}
                    >{item}</div>
                ))}
            </Modal>
        </div>
    )
}