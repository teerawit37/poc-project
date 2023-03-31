import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';
import { Space, Spin } from 'antd';
import Button from "@/components/Button/Button";
import LineIcon from '../../components/Button/LineIcon'

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

                    <div className="sl-signin__block" onClick={() => signIn(null, { callbackUrl: url })}>
                        <div>สำหรับตัวแทน</div>
                        <Button className="mt-2" onClick={() => signIn(null, { callbackUrl: url })}>
                            <LineIcon color="white" className="me-2"></LineIcon>เข้าสู่ระบบ
                        </Button>
                    </div>
                    <div className="sl-signin__block sl-signin__block--orange" >
                        <div>สำหรับลูกค้า</div>
                        <Button className="mt-2" onClick={() => signIn(null, { callbackUrl: url })}>
                            <LineIcon color="white" className="me-2"></LineIcon>เข้าสู่ระบบ
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}
