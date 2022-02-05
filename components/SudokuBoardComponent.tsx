import { Board } from "@utils/sudoku";
import React, { useState } from "react";
import styles from "@styles/Board.module.css";
import { isValid } from "@utils/sudoku_checker";
import { stringLength } from "@firebase/util";

export type SudokuBoardProps = {
    sudoku: Board;
    inputPositions: Array<{ x: number; y: number }>;
    onChange: (board: Board,pos:{x:number,y:number},value:number) => void;
};
type OneCharInputProps = {
    defualtValue: string;
    className: string | undefined;
    valuesAllowed: string;
    onChange: (string: string) => void | undefined;
};

function OneCharInput(props: OneCharInputProps) {
    const [val, setval] = useState(props.defualtValue);

    return (
        <input
            className={props.className ?? ""}
            value={val}
            onFocus={(a) => {
                a.target.setSelectionRange(a.target.value.length, a.target.value.length);
            }}
            
            onChange={(a) => {
                let currentval = '';
                setval(a.target.value.slice(-1));
                if (
                    a.target.value.length > 0 &&
                    props.valuesAllowed.indexOf(a.target.value.slice(-1)) > -1
                ) {
                    currentval = a.target.value.slice(-1);
                    setval(a.target.value.slice(-1));
                } else {
                    currentval = props.defualtValue;
                    setval(props.defualtValue);
                    
                }
                props.onChange(currentval);
            }}

        />
    );
}

export default function SudokuBoard(props: SudokuBoardProps) {

    return (
        <div className={styles.sudokuTable}>
            {props.sudoku.map((a, i) =>
                a.map((b, j) => {
                    var str = "";
                    if (j % 3 === 2) {
                        str += styles.rightB + " ";
                    }
                    if (j % 3 === 0) {
                        str += styles.leftB + " ";
                    }

                    if (i % 3 === 2) {
                        str += styles.bottomB + " ";
                    }
                    if (i % 3 === 0) {
                        str += styles.topB + " ";
                    }
                    str = str.slice(0, str.length - 1);
                    return (
                        <div className={str} key={j}>
                            {props.inputPositions.some(a => a.x == j && a.y == i) ? (
                                (() => {
                                    var isV = isValid(props.sudoku, i, j);

                                    return (<OneCharInput
                                        className={props.sudoku[i][j] == 0 ? styles.input : (isV ? styles.valid : styles.invalid)}
                                        defualtValue={"0"}
                                        valuesAllowed="123456789"
                                        onChange={(a: string) => {
                                            props.sudoku[i][j] = parseInt(a);
                                            props.onChange(props.sudoku,{x:j,y:i},parseInt(a));
                                        }}
                                    />)
                                })()

                            ) : (
                                <div>{b} </div>
                            )}
                        </div>
                    )
                })
            )}
        </div>
    );
}
