import LoadingComponent from '@components/LoadingComponent';
import useCollection from '@hooks/useCollection';
import { collection, getFirestore, orderBy, query } from 'firebase/firestore';
import React, { useState } from 'react';

type GameComponentProps = {

}
function GameComponent(props:any){
    return (
        <div>

        </div>
    )
}


export default function History() {
    const firestore = getFirestore();
    const sudokusCollection = collection(firestore,'sudokus');

    const [limit, setLimit] = useState(10);
    const [games, loading,error] = useCollection(sudokusCollection,q=>{
        return query(q,orderBy('createdAt','desc'));
    },limit);
    return (
        <>
            <h1>History</h1>
            {loading?<div className='center'>
                 <LoadingComponent/>
                 </div>
                 :<p>{games.map(a=>JSON.stringify(a))}</p>}
        </>
    );
}
