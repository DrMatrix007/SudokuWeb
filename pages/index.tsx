import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'





export default function Home() {
  const auth = getAuth()


  const authState = useAuthState(auth)

  return (
    <div className='light-padding'>
      <h2>

        Hello, this is the homepage!
      </h2>

    </div>
  )
}
