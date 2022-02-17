import SignIn from '@components/SignInComponent';
import PlacedStats from '@components/Stats/PlacedStats';
import StatsLayout from '@components/Stats/StatsLayout';
import useDocument from '@hooks/useDocument';
import useUser from '@hooks/useUser';
import { User } from 'firebase/auth';
import { collection, doc, getFirestore } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'


export default function PlacedData() {


    const router = useRouter();

    const user = useUser();

    const { id } = router.query as { id: string };


    //if the user is not logged in, show the sign in page
    return <>
        {user ? <PlacedDataWithData id={id} user={user} /> : <SignIn />}
    </>;
}



type PlacedDataProps = {
    id: string;
    user: User;
}



function PlacedDataWithData(props: PlacedDataProps) {

    const firestore = getFirestore();



    const sudokusCollection = collection(doc(collection(firestore, 'sudokus'), props.user.uid), "userSudokus");


    const [data, loading, error] = useDocument(doc(sudokusCollection, props.id as string));

    const steps = (data.steps ? data.steps : [] as Array<{}>).map((step: any) => {
        return {
            row: Math.floor(step.place / 9) + 1,
            col: (step.place % 9) + 1,
            value: step.value,
            isValid: step.isValid
        }
    });
    return (
        <StatsLayout>
            <Head>
                <title>Placed Data</title>
            </Head>
            <div className='center'>
                <h1>Placed - Data</h1>
                <PlacedStats list={steps} />
            </div>
        </StatsLayout>

    )
}
