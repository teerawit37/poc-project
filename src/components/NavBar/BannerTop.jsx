import { useSession, signIn, signOut } from "next-auth/react"
import Button from '../Button/Button';
import { useRouter } from 'next/router'
export default function NavBar() {
    const router = useRouter();
    const handleClick = (path) => {
        router.push(path)
      }
    
    return (
        <div className="sl-banner-top">
            <Button onClick={() => handleClick('/lobby/thai')}>เริ่มเล่นหวยออนไลน์</Button>
        </div>
    )
}