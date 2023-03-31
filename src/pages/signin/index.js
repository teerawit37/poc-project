import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';
import { Space, Spin } from 'antd';

export default function Signin() {
    const { data: session } = useSession()
    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_WEB_URL + 'signup/verify';
    const urlOut = process.env.NEXT_PUBLIC_WEB_URL + '/';

    return (
        <div className="sl-signin">
            <div className="container">
            <div className="sl-signin__title">เลือกประเภทผู้ใช้งาน</div>
                <div className="sl-signin__container">
                    
                    <div className="sl-signin__block" onClick={() => signIn(null, { callbackUrl: url })}>สำหรับตัวแทน</div>
                    <div className="sl-signin__block sl-signin__block--orange" onClick={() => signIn(null, { callbackUrl: url })}>สำหรับลูกค้า</div>
                </div>
            </div>
        </div>
    )
}
