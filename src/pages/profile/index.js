import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default function Profile(user) {
    const { data: session } = useSession()
    const [data, setData] = useState(undefined);
    const getProfile = () => {
        AuthService.getProfile(session.token.sub).then(
            (res) => {
                setData(res.data)
            },
            error => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session])

    return (
        <>
            <div className='sl-profile'>
                <div className="container d-flex flex-column align-items-center">
                    <div className='sl-profile__container'>
                        <div className='sl-profile__header mt-2 mb-2'>Profile</div>
                        {data !== undefined &&
                        <div className='sl-profile__zone'>
                            <div className='sl-profile__label'>ชื่อ: {data.name}</div>
                            <div className='sl-profile__label'>เบอร์โทร: {data.phone}</div>
                            <div className='sl-profile__label'>ธนาคาร: {data.bank_name}</div>
                            <div className='sl-profile__label'>เลขบัญชี: {data.bank_number}</div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const accessToken = cookies.accessToken;

    if (!accessToken || !session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = decoded.id;
        return {
            props: {
                user,
            },
        };
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

}
