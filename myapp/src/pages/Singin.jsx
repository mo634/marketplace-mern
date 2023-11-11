import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { isLoading, signinComplete, signinFail } from "../redux/user/userSlice"

const Singin = () => {
    //states
    const [userInfo, setUserInfo] = useState({});
    const dispatch = useDispatch()
    const {loading ,error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    //func
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.id]: e.target.value,
        });
    };
    const handlesSubmit = async (e) => {
        e.preventDefault();
        dispatch(isLoading(true))
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(userInfo),
            });


            const data = await res.json();

            console.log(data.successs)
            if (data.success) {
                dispatch(signinComplete(data))
                navigate("/home")
            }

            else {
                dispatch(signinFail(data.message))
            }
            
        } catch (error) {
            console.log("error");
            dispatch(signinFail(error.message))
        } finally {
            dispatch(isLoading(false))
        }
    };
    return (
        <section className=" p-10 flex flex-col items-center justify-center">
            <h1 className=" text-2xl mb-3 text-parg-color">sign in</h1>
            <form onSubmit={handlesSubmit} className=" flex flex-col gap-5 w-[50%] max-w-lg ">
                <input onChange={handleChange} type="email" placeholder=" Email" className="input_field" id="email" />
                <input
                    type="password"
                    onChange={handleChange}
                    placeholder=" password"
                    className="input_field"
                    id="password"
                />
                {loading ? (
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    <button className="main_btn text-center">singn in </button>
                )}
                <button className="main_btn !bg-[#03a9f4]">continue with google</button>
            </form>

            <div className=" mt-3 flex gap-2">
                <p className=" text-parg-color">Dont have an account</p>
                <Link to="/sign-up">sing up</Link>
            </div>
            {error && <p className=" text-red-700">{error}</p>}
        </section>
    );
};

export default Singin;
