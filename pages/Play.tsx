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




export default function Play() {
    var user = useUser();
    var [startBoard, setStartBoard] = useState<Board>();
    var [currentSudoku, setCurrentSudoku] = useState<Board>();
    var [positions, setPositions] = useState<Array<{ x: number, y: number }>>([]);
    var [steps, addStep,] = useArray<{ place: number, value: number, isValid: boolean }>([]);
    useEffect(() => {
        var sudoku = getSudoku(5);
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

    // console.log(steps);

    return (
        <>
            <Head>
                <title>
                    Play - Sudoku
                </title>
            </Head>
            <div className='center'>

                {
                    user ? <>
                        {
                            currentSudoku ? <SudokuBoard inputPositions={positions} sudoku={currentSudoku.map(a => a.map(a => a)) as Board} onChange={async (a, b, c, isValid) => {
                                let last = steps[steps.length - 1];
                                if (!last) {
                                    addStep({ place: b.y * 9 + b.x, value: c, isValid: isValid });
                                } else if ((last.place !== b.y * 9 + b.x || last.value !== c)) {
                                    addStep({ place: b.y * 9 + b.x, value: c, isValid: isValid });
                                }
                                setCurrentSudoku(a);

                                if (isValidConfig(a)) {
                                    var id = await saveValues();
                                    router.push(`/History/${id}/Done`);
                                }


                            }} /> : <p>loading</p>
                        }
                    </> :
                        <SignIn />
                }
                {/* <button onClick={() => saveValues()}>save progress</button> */}
            </div>
        </>

    );
}

