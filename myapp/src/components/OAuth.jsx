import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import { signinComplete } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    //states 
    const dispatch = useDispatch()
    const navigate=useNavigate()
    //func
    
    const handleGoogleProvider=async() => {
        try {
            // identify provider

            const provider = new GoogleAuthProvider()

            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            
            console.log(result)

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: result.user.displayName
                    , email:result.user.email,
                    photo:result.user.photoURL
                }),
            });

            const data = await res.json();

            dispatch(signinComplete(data))

            navigate("/")



            // identify 
        } catch (error) {
            console.log("error when register by google ",error)
        }
    }

return (
    <button
        onClick={handleGoogleProvider}
        type='button'
        className="main_btn !bg-[#03a9f4]">continue with google</button>
)
}
