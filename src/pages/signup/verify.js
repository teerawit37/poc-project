import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';
import { Space, Spin } from 'antd';

export default function Signup() {
    const [bank, setBank] = useState('');
    const [name, setName] = useState('');
    const [account, setAccount] = useState('')
    const router = useRouter();
    const { data: session } = useSession()

    const signin = () => {
        AuthService.signin(session.token.sub).then(
            (res) => {
                router.push('/')
            },
            error => {
                console.log(error)
            }
        )
    }

    const checkUserAuth = () => {
        AuthService.verifyAuth(session.token.sub).then(
            (res) => {
                console.log(res)
                if (res.data.status === "non") {
                    router.push('/signup')
                } else {
                    if (res.data.status === "waiting") {
                        router.push('/signup/waiting')
                    } else {
                        signin();
                    }
                }
            },
            error => {
                console.log(error)
            }
        )
    }
    useEffect(() => {
        if (session) {
            checkUserAuth();
        }
    }, [session])
    return (
        <div className="sl-verify">
            <div className="sl-verify__space">
            <Space size="middle">
                <Spin size="large" />
            </Space>
            </div>
        </div>
    )
}
