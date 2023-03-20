import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import Input from '@/components/Input'
import { Select, Space } from 'antd';
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';

export default function Signup() {
    const [bank, setBank] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [account, setAccount] = useState('')
    const router = useRouter();
    const { data: session } = useSession()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setBank(value)
    };
    const handleRegister = () => {
        if (validateBankAccount(account)) {
            router.push('/')
        } else {
            alert(account)
        }
    };
    const handleNameChange = (e) => {
        setName(e.target.value)
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    };
    const handleAccountChange = (e) => {
        setAccount(e.target.value)
    };

    const createUserProfile = () => {
        // console.log(account)
        AuthService.createProfile(session.token.sub, name, phone, account, bank).then(
            (res) => {
                router.push('/signup/waiting');
            },
            error => {
                console.log(error)
            }
        )
    }
    const signupUser = () => {
        AuthService.signup(session.token.sub, session.token.name).then(
            (res) => {
                createUserProfile()
            },
            error => {
                console.log(error)
            }
        )
    }
    const validateBankAccount = (accountNumber) => {
        if (!accountNumber || typeof accountNumber !== 'string') {
            return false;
        }
        accountNumber = accountNumber.replace(/\s/g, '');
        if (!/^\d+$/.test(accountNumber)) {
            return false;
        }
        if (accountNumber.length !== 10) {
            return false;
        }
        return true;
    }
    return (
        <div className="sl-signup">
            <div className="container d-flex flex-column align-items-center">
                <div className='sl-signup__container'>
                    <div className='sl-signup__header mt-2 mb-2'>สมัครสมาชิก</div>
                    <div className='sl-signup__form-contianer'>
                        <Input title="ชื่อ - นามสกุล" type="text" value={name} onChange={handleNameChange} className="mb-2"></Input>
                        <Input title="เบอร์โทรศัพท์" type="text" value={phone} onChange={handlePhoneChange} className="mb-2"></Input>
                        {/* <Input title="ธนาคาร" type="text" className="mb-2"></Input> */}
                        <Select
                            className='sl-signup__input mb-2'
                            placeholder="เลือกธนาคาร"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            bordered={false}
                            options={[
                                { value: 'kbank', label: 'กสิกรไทย' },
                                { value: 'scb', label: 'ไทยพาณิชย์' },
                                { value: 'ktb', label: 'กรุงไทย' },
                                { value: 'bbl', label: 'กรุงเทพ' },
                                { value: 'bay', label: 'กรุงศรีอยุธยา' },
                                { value: 'tmb', label: 'ทหารไทย' },
                            ]}
                        />
                        <Input title="เลขบัญชี" value={account} type="text" onChange={handleAccountChange} className="mb-3"></Input>
                        <Button className="mb-6" type="long" onClick={signupUser} >สมัครสมาชิก</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
