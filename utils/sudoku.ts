export type Board = [
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[],
    number[]
];

function shuffle<T>(array: Array<T>) {
    return array.sort(() => 0.5 - Math.random());
}
function arrayRotate<T>(arr: Array<T>, reverse: boolean) {
    arr = arr.map((a) => a);

    if (reverse) arr.unshift(arr.pop()!);
    else arr.push(arr.shift()!);
    return arr;
}
function arrayRotateNumberOfTimes<T>(arr: Array<T>, value: number) {
    arr = arr.map((a) => a);
    var r = false;
    if (value > 0) {
        r = false;
    } else {
        r = true;
    }
    for (let index = 0; index < Math.abs(value); index++) {
        arr = arrayRotate(arr, r);
    }
    return arr;
}

export const BOARD_SIZE = 9;

function shuffleRow(board: Board, row1: number, row2: number) {
    var old1 = board[row1];
    board[row1] = board[row2];
    board[row2] = old1;
}
function shuffleColumn(board: Board, col1: number, col2: number) {
    for (let index = 0; index < BOARD_SIZE; index++) {
        var old1 = board[index][col1];
        board[index][col1] = board[index][col2];
        board[index][col2] = old1;
    }
}

export default function getSudoku(removeCount:number = 0) {
    var range = [0, 1, 2];
    var values = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        values.push(i + 1);
    }
    values = shuffle(values);
    var board: Board = [
        values,
        arrayRotateNumberOfTimes(values, 3),
        arrayRotateNumberOfTimes(values, 6),

        arrayRotateNumberOfTimes(values, 7),
        arrayRotateNumberOfTimes(values, 10),
        arrayRotateNumberOfTimes(values, 13),

        arrayRotateNumberOfTimes(values, 14),
        arrayRotateNumberOfTimes(values, 17),
        arrayRotateNumberOfTimes(values, 20),
    ];

    // range.sort((a, b) => 0.5 - Math.random());
    range = shuffle(range);
    for (let rangei = 0; rangei < range.length; rangei++) {
        for (let i = 0; i < 3; i++) {
            shuffleRow(board, 0 + i * 3, range[i] * 3 + 0);
            shuffleRow(board, 1 + i * 3, range[i] * 3 + 1);
            shuffleRow(board, 2 + i * 3, range[i] * 3 + 2);
        }
    }

    range = shuffle(range);
    for (let rangei = 0; rangei < range.length; rangei++) {
        for (let i = 0; i < 3; i++) {
            shuffleColumn(board, 0 + i * 3, range[i] * 3 + 0);
            shuffleColumn(board, 1 + i * 3, range[i] * 3 + 1);
            shuffleColumn(board, 2 + i * 3, range[i] * 3 + 2);
        }
    }

    for (let index = 0; index < 3; index++) {
        range = shuffle(range);
        for (let i = 0; i < range.length; i++) {
            shuffleColumn(board, index * 3 + i, index * 3 + range[i]);
        }
    }
    for (let index = 0; index < 3; index++) {
        range = shuffle(range);

        for (let i = 0; i < range.length; i++) {
            shuffleRow(board, index * 3 + i, index * 3 + range[i]);
        }
    }
    var pos:Array<{x:number,y:number}> = [];
    for (let index = 0; index < removeCount; index++) {
    
        var row = Math.floor(Math.random() * BOARD_SIZE);
        var col = Math.floor(Math.random() * BOARD_SIZE);
        pos.push({x:col,y:row});
        board[row][col] = 0;

    }

    return [board,pos] as [Board,Array<{x:number,y:number}>];
}
