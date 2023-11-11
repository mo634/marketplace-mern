import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
const Singup = () => {
    //states
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            const data = await res.json();
            if (data.success) {
                navigate("/sign-in")
            }

            else {
                setError(data.message)
            }


        } catch (error) {
            setError(error.message);
        } 
        
        finally {
            setIsLoading(false);
        }
    };
    return (
        <section className=" p-10 flex flex-col items-center justify-center">
            <h1 className=" text-2xl mb-3 text-parg-color">Sign up</h1>
            <form onSubmit={handlesSubmit} className=" flex flex-col gap-5 w-[50%] max-w-lg ">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder=" username"
                    className="input_field"
                    id="username"
                />
                <input onChange={handleChange} type="email" placeholder=" Email" className="input_field" id="email" />
                <input
                    type="password"
                    onChange={handleChange}
                    placeholder=" password"
                    className="input_field"
                    id="password"
                />
                {isLoading ? (
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : (
                    <button className="main_btn">singn up </button>
                )}
                <button className="main_btn !bg-[#03a9f4]">continue with google</button>
            </form>

            <div className=" mt-3 flex gap-2">
                <p className=" text-parg-color">have an account</p>
                <Link to="/sign-in">sing in</Link>
            </div>
        {error && <p className=" text-red-500">{error}</p>}
        </section>
    );
};

export default Singup;
