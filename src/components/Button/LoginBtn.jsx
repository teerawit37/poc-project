import { useSession, signIn, signOut } from "next-auth/react"
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Button from './Button';
import { Dropdown, Space } from 'antd';
import { useRouter } from 'next/router'
import AuthService from '../../services/auth.service';
import LineIcon from './LineIcon'
import { Drawer } from 'antd';
import { useState } from "react";
import { MenuOutlined } from '@ant-design/icons';

export default function LoginBtn() {
    const { data: session } = useSession()
    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_WEB_URL + 'signup/verify';
    const urlOut = process.env.NEXT_PUBLIC_WEB_URL + '/';
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(!open);
    };

    const onClose = () => {
        setOpen(false);
    };

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
            <div className="sl-menu-button">

                {/* <Button onClick={() => signOut()}>Sign out</Button> */}
                {/* <div onClick={showDrawer}><MenuOutlined /></div> */}
                <div className="sl-menu-icon" onClick={showDrawer}>
                    <div className={`sl-menu-icon__bar1 ${open ? 'sl-menu-icon__bar1--change' : ''}`}></div>
                    <div className={`sl-menu-icon__bar2 ${open ? 'sl-menu-icon__bar2--change' : ''}`}></div>
                    <div className={`sl-menu-icon__bar3 ${open ? 'sl-menu-icon__bar3--change' : ''}`}></div>
                </div>
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                    <div className="sl-drawer">
                        <div className="d-flex">
                            <img
                                alt={`profile image ${session.user.name}`}
                                src={session.user.image}
                                className="sl-drawer__profile-image"
                            ></img>
                            <div className="sl-drawer__profile-container">
                                <div className="sl-drawer__label">
                                    {session.user.name}
                                </div>
                            </div>
                        </div>
                        <div className="sl-drawer__item mt-4" onClick={() => router.push('/profile')}>
                            ข้อมูลส่วนตัว
                        </div>
                        <div className="sl-drawer__item" onClick={() => handleSignout()}>
                            ออกจากระบบ
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
    return (
        <>
            <Button onClick={() => router.push('/signin')}>
                <LineIcon color="white" className="me-2"></LineIcon>เข้าสู่ระบบ
            </Button>
        </>
    )
}