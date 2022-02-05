import { useState } from "react";

export default function useArray<T>(values:Array<T>) {
    const [arr, setarr] = useState(values);
    const add = (value:T) => {
        setarr([...arr, value]);
    }
    const remove = (values:T) => {
        setarr(arr.filter((value) => value !== values));
    }
    return [arr, add, remove] as [Array<T>, (value:T) => void, (value:T) => void];
}