import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Lobby from '../../components/Lobby/Lobby';
import Rule from '../../components/Lobby/Rule';
import Check from '../../components/Lobby/Check';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Radio, Tabs } from 'antd';
import LottoList from '@/components/List/LottoList';

export default function ThaiLotto() {
    const { data: session } = useSession()
    const [ number, setNumber ] = useState([])
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const saved = window.localStorage.getItem("MY-LOTTO-LIST");
            const initialValue = JSON.parse(saved);
            if (initialValue !== null) {
                if (initialValue.length > 0) {
                    setNumber(initialValue);
                }
            }
        }
    }, [router.pathname])

    const menu = [
        {
            title: 'เล่นหวย',
            content: <Lobby></Lobby>
        },
        {
            title: 'โพยหวย',
            content: <LottoList item={number}></LottoList>
        },
        {
            title: 'ตรวจหวย',
            content: <Check></Check>
        },
        {
            title: 'กติกา',
            content: <Rule></Rule>
        },
    ]
    return (
        <div className='sl-lotto-lobby'>
            <div className='sl-lotto-lobby__banner'>
                หวยรัฐบาลไทย
            </div>
            <div className='container'>
            <div className='sl-lotto-lobby__tab-container'>
                <Tabs
                    className='sl-lotto-lobby__tab'
                    defaultActiveKey="1"
                    size={'large'}
                    style={{ marginBottom: 32 }}
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
    )
}
