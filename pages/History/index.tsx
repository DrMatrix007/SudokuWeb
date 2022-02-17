import LoadingComponent from '@components/LoadingComponent';
import SignIn from '@components/SignInComponent';
import useCollection from '@hooks/useCollection';
import useUser from '@hooks/useUser';
import { Board } from '@utils/sudoku';
import { User } from 'firebase/auth';
import { collection, doc, getFirestore, orderBy, query, Timestamp } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

type GameComponentProps = {
    game: Board,
    dateCreated: Date,
    id: string
}
//each individual game 'title'
function GameComponent(props: GameComponentProps) {
    return (
        <div>
            <Link href={"History/" + props.id}>
                <h3>
                    {props.dateCreated.toLocaleString()}
                </h3>
            </Link>

        </div>
    )
}


export default function History() {

    const user = useUser();
    //if the user is not logged in, show the sign in page
    return (
        <>
            {user ? <HistoryWithID user={user} /> : <SignIn />}
        </>
    );
}


function HistoryWithID({ user }: { user: User }) {


    const firestore = getFirestore();
    const sudokusCollection = collection(doc(collection(firestore, 'sudokus'), user.uid), "userSudokus");

    const [limit, setLimit] = useState(10);
    const [gamesData, loading, error] = useCollection(sudokusCollection, q => {
        return query(q, orderBy('createdAt', 'desc'));
    }, limit);

    const games = gamesData.map(game => {
        return {
            id: game.id,
            board: game.board,
            dateCreated: game.createdAt
        }
    })
    
    return <>
        <Head>
            <title>
                History - {user.displayName}
            </title>
        </Head>
        <h1>History</h1>
        {/* each game that is stored get mapped into the ui */}
        {loading ? <div className='center'>
            <LoadingComponent />
        </div>
            : games.map((a, i) => <GameComponent key={i} id={a.id} game={a.board} dateCreated={(a.dateCreated as Timestamp).toDate()} />)
        }
    </>

}