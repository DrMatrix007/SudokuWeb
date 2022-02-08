import { DocumentReference, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useDocument(ref: DocumentReference) {
    const [doc, setDoc] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            ref,
            (snapshot) => {
                setDoc({ ...snapshot.data(), id: snapshot.id });
                setLoading(false);
            },
            (err) => {
                setError(true);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    return [doc, loading, error] as [
        { id: string; [field: string]: any },
        boolean,
        boolean
    ];
}
