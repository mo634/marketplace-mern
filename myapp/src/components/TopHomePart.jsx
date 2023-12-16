import {Link} from "react-router-dom";

const TopHomePart = () => {
    return (
        <div className=" p-28 px-7 flex flex-col gap-3">
            <h1 className=" font-bold text-3xl text-[#333] ">
                Find your next perfect
                <br />
                place with ease
            </h1>

            <p className=" text-gray-500">
                Sahand Estate will help you find your home fast, easy and comfortable.
                <br />
                Our expert support are always available.
            </p>

            <Link to={"/search"} className=" hover:underline text-main-color">
                let's start now
            </Link>
        </div>
    );
};

export default TopHomePart;
