import {FaSearch} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    //create search state 
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    //func

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParam = new URLSearchParams(window.location.search)
        
        urlParam.set("searchTerm", searchTerm)
        
        const searchQuery = urlParam.toString() 

        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParam = new URLSearchParams(location.search)

        const searchTermFromUrl = urlParam.get("searchTerm")

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }

    },[])
    return (
        <header className=" bg-header-color p-5 shadow-md">
            <nav className="my_container flex justify-between items-center ">
                <Link to={ "/home"} className="text_media">
                    <span className=" text-gray-600 text_media">Market</span> <span className="text-main-color">Place</span>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className=" flex items-center bg-white p-2 rounded-md shadow-md  mx-[20px]">
                    <input type="text" className="search_field" placeholder=" Search"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}

                    />
                    <button>
                        <FaSearch className=" text-main-color" />
                    </button>
                </form>
                <ul className=" flex items-center">
                    <Link to={"/home"} className="Link_media">
                        <li className="headr_link">Home</li>
                    </Link>
                    <Link to={"/about"} className="Link_media">
                        <li className="headr_link">About</li>
                    </Link>
                    <Link to={"/profile"}>
                        {
                            currentUser ? (
                                <img
                                    className=" h-7 w-7 rounded-full object-cover"
                                    src={currentUser.user.avatar} alt="" />
                            ):<li className="headr_link inline">SignIn</li>
                        }
                    </Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
