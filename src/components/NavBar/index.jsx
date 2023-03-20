import { useSession, signIn, signOut } from "next-auth/react"
import logo from '../../../public/images/logo.png';
import LoginButton from '../Button/LoginBtn';
import Button from '../Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router'


export default function NavBar() {
    const router = useRouter();
    const { data: session } = useSession()
    const handleClick = (path) => {
        router.push(path)
      }
    return (
        <div className="sl-navbar">
            {/* <div className="container"> */}
                <div className="sl-navbar__menu-container">
                    <Image priority onClick={() => handleClick('/')} src={logo} alt={"logo"} className="sl-navbar__logo"></Image>
                    <div>
                        <LoginButton></LoginButton>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}