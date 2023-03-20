import Button from '../Button/Button';
import { useRouter } from 'next/router'
import { ExclamationOutlined } from '@ant-design/icons';
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Input } from 'antd';


const Rule = () => {
    const router = useRouter();
    const { data: session } = useSession()
    return (
        <div className='sl-check'>
            <div className='sl-check__title'>ตรวจหวย</div>
            {session ? (
                // <div>test</div>
                <div className="sl-check__notics">คุณยังไม่มีหวยเลย</div>

            ) : (
                <div className="sl-check__notics-container">
                    <div className="sl-check__notics">คุณยังไม่มีหวยเลย!</div>
                    <div className='mt-2'>
                        <Button onClick={() => handleClick('/lobby/fill-number')}>เล่นหวยเลย</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rule;