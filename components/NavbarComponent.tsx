import React from 'react';
import styles from "@styles/Navbar.module.css"
import Link from 'next/link';
import useUser from '@hooks/useUser';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

export default function Navbar() {
    const auth = getAuth();
    const user = useUser();

    const login = async () => {
        var r = await signInWithPopup(auth, new GoogleAuthProvider());
    }
    const logout = () => {
        auth.signOut()
    }

    return <div className={styles.navbar}>
        <Link href={"/"}>
            <a>
                Home
            </a>
        </Link>
        <Link href={"/Play"}>
            <a>
                Play
            </a>
        </Link>

        <div className={styles.expanded}>
        </div>
        <a onClick={() => (user ? logout : login)()}>
            {(() => {
                if (user) {
                    return <>Sign Out</>
                }
                return <>Sign In</>
            })()}
        </a>
        <p>
            {(() => {
                if (!user) {
                    return <>Not Signed In</>
                }
                return <>Sign in as {user.displayName}</>
            })()}
        </p>
        {(()=>{
            if(user){
                return <img src={user.photoURL!}></img >
            }
        })()}
    </div>
}
