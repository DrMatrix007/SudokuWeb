import { getAuth, User } from "firebase/auth"
import {useAuthState} from 'react-firebase-hooks/auth'

export default function useUser() {
    const auth = getAuth()
    const authState = useAuthState(auth);
    
    return authState[0] as User|undefined;
}