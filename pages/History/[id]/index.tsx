import LoadingComponent from '@components/LoadingComponent';
import SignIn from '@components/SignInComponent';
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



    return <div className='center'>
        {user ? <HistoryData id={id} user={user} /> : <SignIn />}
    </div>;
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

            <div>
                <Head>
                    <title>Stats - {props.user.displayName}</title>
                </Head>
                {/* {JSON.stringify(data)} */}
                {!loading ?
                    <>
                        {data.board}
                        {steps.map((step: any, index: any) => {
                            return <div key={index}>
                                {step.row}:{step.col}:{step.value}:{step.isValid ? 'valid' : 'invalid'}
                            </div>
                        })}
                    </>
                    : <LoadingComponent />
                }
            </div>
        </StatsLayout>

    );
}
