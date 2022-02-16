import { Board, BOARD_SIZE } from "@utils/sudoku";

function notInRow(arr: Board, row: number) {
    let st = new Array();

    for (let i = 0; i < BOARD_SIZE; i++) {
        if (st.includes(arr[row][i])) return false;

        if (arr[row][i] !== 0) st.push(arr[row][i]);
    }
    return true;
}

function notInCol(arr: Board, col: number) {
    let st = new Array();

    for (let i = 0; i < BOARD_SIZE; i++) {
        if (st.includes(arr[i][col])) return false;

        if (arr[i][col] != 0) {
            st.push(arr[i][col]);
        }
    }
    return true;
}

function notInBox(arr: Board, startRow: number, startCol: number) {
    let st = Array();

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let curr = arr[row + startRow][col + startCol];

            if (st.includes(curr)) {
                return false;
            }

            if (curr != 0) {
                st.push(curr);
            }
        }
    }
    return true;
}

export function isValid(arr: Board, row: number, col: number) {
    return (
        notInRow(arr, row) &&
        notInCol(arr, col) &&
        notInBox(arr, row - (row % 3), col - (col % 3))
    );
}

export default function isValidConfig(arr: Board) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if ((!isValid(arr, i, j)) || arr[i][j]==0) return false;
        }
    }
    return true;
}
