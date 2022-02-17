import SignIn from '@components/SignInComponent';
import SudokuBoard from '@components/SudokuBoardComponent';
import useUser from '@hooks/useUser';
import getSudoku, { Board } from '@utils/sudoku';
import React, { useEffect, useState } from 'react';
import useArray from '@hooks/useArray'
import Data from '@utils/data';
import Head from 'next/head';
import { useRouter } from 'next/router';
import isValidConfig from '@utils/sudoku_checker';
import styles from "@styles/Play.module.css";
import { User } from 'firebase/auth';
import Link from 'next/link';


export default function Play() {
    const [play, setplay] = useState(false);

    //
    const [removeCounter, setremoveCounter] = useState(1);

    return (
        <>
            {!play ?

                <div>

                    <h1>
                        Choose Diffidculty
                    </h1>
                    <div className={`center ${styles.diff_buttons}`}>
                        <button className={styles.button} onClick={() => { setplay(true); setremoveCounter(10) }}>Easy</button>
                        <button className={styles.button} onClick={() => { setplay(true); setremoveCounter(20) }}>Medium</button>
                        <button className={styles.button} onClick={() => { setplay(true); setremoveCounter(30) }}>Hard</button>

                    </div>

                </div> :
                <PlayBoard size={removeCounter} />
            }

        </>


    )
}

function PlayBoard({ size }: { size: number }) {


    var user = useUser();
    const [Done, setDone] = useState(false)
    var [startBoard, setStartBoard] = useState<Board>();
    var [currentSudoku, setCurrentSudoku] = useState<Board>();
    var [positions, setPositions] = useState<Array<{ x: number, y: number }>>([]);
    var [steps, addStep,] = useArray<{ place: number, value: number, isValid: boolean }>([]);
    useEffect(() => {
        var sudoku = getSudoku(size);
        setCurrentSudoku(sudoku[0]);
        setStartBoard(sudoku[0]);
        setPositions(sudoku[1]);
    }, [])

    const router = useRouter();

    const saveValues = async () => {
        if (startBoard && user) {
            return await Data.addGameHistoryToUser(startBoard, steps, user.uid)
        }
    }


    return (
        <>
            <Head>
                <title>
                    Play - Sudoku
                </title>
            </Head>
            <div className='center'>

                {
                    //if the user is not logged in, show the sign in page
                    user ? <>
                        {
                            //if the sudoku doesnt exist, show loading screen
                            currentSudoku ?
                                <SudokuBoard inputPositions={positions}
                                    sudoku={currentSudoku.map(a => a.map(a => a)) as Board}


                                    onChange={async (newBoard, position, value, isValid) => {
                                        //add the step to the steps array
                                        let last = steps[steps.length - 1];
                                        if (!last) {
                                            addStep({ place: position.y * 9 + position.x, value: value, isValid: isValid });
                                        }
                                        //if the last step is the same as the current step, dont do anything
                                        else if ((last.place !== position.y * 9 + position.x || last.value !== value)) {
                                            addStep({ place: position.y * 9 + position.x, value: value, isValid: isValid });
                                        }
                                        setCurrentSudoku(newBoard);
                                        //if the sudoku is valid, set the done state to true
                                        if (isValidConfig(newBoard)) {
                                            var id = await saveValues();
                                            setDone(true);
                                        }
                                    }} /> : <p>loading</p>
                        }
                    </> :
                        <SignIn />
                }
                {
                    //if the sudoku is done, show the done screen
                    Done ? <>
                        <DoneWithUser user={user!} />
                    </> : <></>
                }

            </div>
        </>

    );

}
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
