import { CollectionReference, DocumentData, DocumentReference, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useCollection(ref:CollectionReference,q: (q:Query)=>Query, limit?:number) {
    const [docs, setDocs] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(q(ref),
            (snapshot) => {
                const docs:Array<DocumentData> = [];
                snapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id });
                });
                setDocs(docs);
                setLoading(false);
            },
            (err) => {
                setError(true);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    return [docs, loading, error] as [Array<any>, boolean, boolean];
}