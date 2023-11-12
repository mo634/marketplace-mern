import {FaSearch} from "react-icons/fa";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <header className=" bg-header-color p-5 shadow-md">
            <nav className="my_container flex justify-between items-center ">
                <h1 className="text_media">
                    <span className=" text-gray-600 text_media">Market</span> Place
                </h1>
                <form className=" flex items-center bg-white p-2 rounded-md shadow-md  mx-[20px]">
                    <input type="text" className="search_field" placeholder=" Search" />
                    <FaSearch className=" text-main-color" />
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
