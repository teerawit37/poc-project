import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Input from '@/components/Input'
import { Select, Space } from 'antd';
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';

export default function Waiting() {
    const [bank, setBank] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [account, setAccount] = useState('')
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            signOut();
        }
    }, [])

    return (
        <div className="sl-waiting">
            <div className="sl-waiting__space">
                <CheckCircleOutlined className='sl-waiting__icon mb-2' />
                <div>เราได้รับข้อมูลของท่านแล้ว</div>
                <div>เราจะรีบติดต่อกลับไปให้เร็วที่สุด</div>
            </div>
        </div>
    )
}
