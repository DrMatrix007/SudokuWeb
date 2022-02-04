import SignIn from '@components/SignInComponent';
import SudokuBoard from '@components/SudokuBoardComponent';
import useUser from '@hooks/useUser';
import getSudoku, { Board } from '@utils/sudoku';
import React, { useEffect, useState } from 'react';




export default function Play() {
    var user = useUser();
    var [sudoku, setSudoku] = useState<Board>();
    useEffect(() => {
        setSudoku(getSudoku(10));
    }, [])


    return (
        <div className='center'>
        {
                user ? <>
                    {
                        sudoku ? <SudokuBoard sudoku={sudoku} /> : <p>lolading</p>
                    }
                </> :
                    <SignIn />
            }

        </div>

);
}
