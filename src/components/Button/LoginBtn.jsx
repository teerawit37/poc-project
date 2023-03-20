import { useSession, signIn, signOut } from "next-auth/react"
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Button from './Button';
import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';

export default function LoginBtn() {
    const { data: session } = useSession()
    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_WEB_URL + 'signup/verify';
    const urlOut = process.env.NEXT_PUBLIC_WEB_URL + '/';
    
    const handleSignout = () => {
        signOut(null, { callbackUrl: urlOut })
        AuthService.signout();
    }


    const items = [
        {
            key: '1',
            label: (
                <div className="btn-label" onClick={() => router.push('/profile')}>
                    ข้อมูลส่วนตัว
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="btn-label" onClick={() => handleSignout()}>
                    ออกจากระบบ
                </div>
            ),
        },
    ];
    // console.log(url)
    if (session) {
        return (
            <div className="sl-logout-button">

                {/* <Button onClick={() => signOut()}>Sign out</Button> */}
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <img
                                alt={`profile image ${session.user.name}`}
                                src={session.user.image}
                                className="sl-logout-button__profile-image"
                            ></img>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        )
    }
    return (
        <>
            <Button onClick={() => signIn(null, { callbackUrl: url })}>เข้าสู่ระบบ</Button>
        </>
    )
}