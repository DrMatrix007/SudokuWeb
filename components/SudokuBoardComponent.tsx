import { Board } from '@utils/sudoku';
import React, { useState } from 'react';
import styles from '@styles/Board.module.css'

export type SudokuBoardProps = {
    sudoku: Board;

}
type OneCharInputProps = {
    defualtValue: string;
    onChange: (string:string) => void | undefined;
}

function OneCharInput(props:OneCharInputProps) {

    const [val, setval] = useState(props.defualtValue);


    return <input className={styles.input} value={val} onChange={a => {
        if (a.target.value.length > 0) {
            setval(a.target.value.slice(-1));
        }else{
            setval(props.defualtValue);
        }
    }} />
}


export default function SudokuBoard(props: SudokuBoardProps) {
    return <div className={styles.sudokuTable}>

        {props.sudoku.map((a, i) => (
            // <div key={i} className="row">
            a.map((b, j) => (
                // null
                <div key={j}>{b == 0 ? <OneCharInput defualtValue={'0'} onChange={()=>{}} /> : <p> {b} </p>}</div>
            ))
            // </div>
        ))}

    </div>;
}
