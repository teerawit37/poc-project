import Button from '../Button/Button';
import { useRouter } from 'next/router'
import { ExclamationOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Input } from 'antd';


const Lobby = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const [date, setDate] = useState('')
    const url = process.env.NEXT_PUBLIC_WEB_URL + 'lobby/shared/';
    
    const handleClick = (path) => {
        router.push(path)
    }

    useEffect(() => {
        setDate(new Date().toLocaleString())
    },[router.pathname])


    return (
        <div className='sl-lobby'>
            <div className='sl-lobby__head-container'>
                <div className='sl-lobby__sub-head'>งวดวันที่</div>
                <div className='sl-lobby__head'>1 เมษายน 2566</div>
            </div>
            <Button onClick={() => handleClick('/lobby/fill-number')}>เล่นหวยเลย</Button>
            {session && (
                <div className='sl-lobby__shared'>
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 100px)', height: '42px' }} defaultValue={url + session.user.name} />
                        <Button type="primary" onClick={() => { navigator.clipboard.writeText(url + session.user.name) }}>คัดลอก</Button>
                    </Input.Group>
                </div>
            )}
            <div className='sl-lobby__number-list'>
                <div className='sl-lobby__title'>เลขปิดรับเล่นและเลขอั้น</div>
                <div className='sl-lobby__sub-title'>ข้อมูล ณ วันที่ {date} น.</div>
                <div className='sl-lobby__label'>ไม่มีรายการ!</div>
                <div className='sl-lobby__sub-label'>ตอนนี้ยังไม่มีเลขหวยปิดและเลขอั้น</div>
            </div>
        </div>
    );
};

export default Lobby;