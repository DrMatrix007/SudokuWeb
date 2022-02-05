import SignIn from '@components/SignInComponent';
import SudokuBoard from '@components/SudokuBoardComponent';
import useUser from '@hooks/useUser';
import getSudoku, { Board } from '@utils/sudoku';
import React, { useEffect, useState } from 'react';
import useArray from '@hooks/useArray'
import Data from '@utils/data';




export default function Play() {
    var user = useUser();
    var [startBoard, setStartBoard] = useState<Board>();
    var [currentSudoku, setCurrentSudoku] = useState<Board>();
    var [positions, setPositions] = useState<Array<{ x: number, y: number }>>([]);
    var [steps, addStep,] = useArray<{ place: number, value: number }>([]);
    useEffect(() => {
        var sudoku = getSudoku(10);
        setCurrentSudoku(sudoku[0]);
        setStartBoard(sudoku[0]);
        setPositions(sudoku[1]);
    }, [])

    const saveValues = async () => {
        if (startBoard && user) {
            await Data.addGameHistoryToUser(startBoard, steps, user.uid)
        }
    }

    // console.log(steps);

    return (
        <div className='center'>

            {
                user ? <>
                    {
                        currentSudoku ? <SudokuBoard inputPositions={positions} sudoku={currentSudoku.map(a => a.map(a => a)) as Board} onChange={(a, b, c) => {
                            let last = steps[steps.length - 1];
                            if (!last) {
                                addStep({ place: b.y * 9 + b.x, value: c });
                            } else if ((last.place !== b.y * 9 + b.x || last.value !== c)) {
                                addStep({ place: b.y * 9 + b.x, value: c });
                            }
                            setCurrentSudoku(a);
                        }} /> : <p>loading</p>
                    }
                </> :
                    <SignIn />
            }
            <button onClick={() => saveValues()}>save progress</button>
        </div>

    );
}

