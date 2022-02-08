import { Board, BOARD_SIZE } from "./sudoku";
import {getFirestore,collection, doc,setDoc, Timestamp} from 'firebase/firestore';
import { stdin } from "process";
import { sortAndDeduplicateDiagnostics } from "typescript";

export default class Data {

    static async addGameHistoryToUser(board:Board,steps:Array<{ place: number, value: number,isValid:boolean }>, userId:string): Promise<void> {
        const db = getFirestore();
        const udoc = doc( collection(db,("sudokus")),userId);
        const sdoc = doc(collection(udoc, "userSudokus"));
        const data = {
            board: this.boardToString(board),
            steps: steps,
            createdAt: Timestamp.now()
        };
        
        await  setDoc(sdoc,(data), { merge: true });
    }
    static boardToString(board: Board) {
        var str = "";
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                str += board[i][j].toString();
            }
        }
        return str;
    }

}