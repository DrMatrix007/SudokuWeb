import LoadingComponent from '@components/LoadingComponent';
import SignIn from '@components/SignInComponent';
import IsValidStatsComponent from '@components/Stats/IsValidStatsComponent';
import StatsLayout from '@components/Stats/StatsLayout';
import useDocument from '@hooks/useDocument';
import useUser from '@hooks/useUser';
import { User } from 'firebase/auth';
import { collection, doc, getFirestore } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { userInfo } from 'os';
import React from 'react';

type HistoryDataProps = {
    id: string;
    user: User;
}

export default function HistoryWithID() {



    const router = useRouter();

    const user = useUser();

    const { id } = router.query as { id: string };



    return <>
        {user ? <HistoryData id={id} user={user} /> : <SignIn />}
    </>;
}

function HistoryData(props: HistoryDataProps) {

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





    // console.log(data);

    return (
        <StatsLayout>

            <Head>
                <title>Stats - {props.user.displayName}</title>
            </Head>
            <div className='center'>
                {!loading ?
                    <>
                    <h1>
                        Main Stats
                    </h1>
                        <IsValidStatsComponent list={steps} />
                    </>
                    : <LoadingComponent />
                }


            </div>
        </StatsLayout>


    );
}
