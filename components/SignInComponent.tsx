import useUser from "@hooks/useUser";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {
    const user = useUser();
    const auth = getAuth();

    const login = async () => {
        var r = await signInWithPopup(auth, new GoogleAuthProvider());

    }

    return <div className='center'>
        {user ? (
            <h2>Already Logged in as {user.displayName}</h2>) :
            (
                <button onClick={() => login()}>
                    Sign In
                </button>
            )
        }


    </div>;
}