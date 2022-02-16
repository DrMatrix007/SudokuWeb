import SignIn from '@components/SignInComponent';
import useUser from '@hooks/useUser';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function DoneWithUser({ user }: { user: User }) {

    const router = useRouter();

    const { id } = router.query;

    return (
        <div>
            <h1>Congrats!!! </h1>
            <h2>You finished this sudoku, to see your stats, <Link href={`/History/${id}`}> click this</Link> </h2>
        </div>
    )
}

export default function Done() {

    const user = useUser();

    return (
        <>
            {user ? <DoneWithUser user={user} /> : <SignIn />}
        </>
    );
}
