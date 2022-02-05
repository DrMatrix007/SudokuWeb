import { Board,BOARD_SIZE } from "@utils/sudoku";

function notInRow(arr:Board, row:number) {
    let st = new Set();

    for (let i = 0; i < BOARD_SIZE; i++) {
        if (st.has(arr[row][i])) return false;

        if (arr[row][i] !== 0) st.add(arr[row][i]);
    }
    return true;
}

function notInCol(arr:Board, col:number) {
    let st = new Set();

    for (let i = 0; i < BOARD_SIZE; i++) {
        if (st.has(arr[i][col])) return false;

        if (arr[i][col] != 0) st.add(arr[i][col]);
    }
    return true;
}

function notInBox(arr:Board, startRow:number, startCol:number) {
    let st = new Set();

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let curr = arr[row + startRow][col + startCol];

            if (st.has(curr)) return false;

            if (curr != 0) st.add(curr);
        }
    }
    return true;
}

export function isValid(arr:Board, row:number, col:number) {
    return (
        notInRow(arr, row) &&
        notInCol(arr, col) &&
        notInBox(arr, row - (row % 3), col - (col % 3))
    );
}

export default function isValidConfig(arr:Board, n:number) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!isValid(arr, i, j)) return false;
        }
    }
    return true;
}