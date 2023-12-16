import {Link} from "react-router-dom";
import {MdLocationOn} from "react-icons/md";
const ListItem = ({element}) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden  rounded-lg  w-full sm:w-[330px]">
            <Link to={`/listings/${element._id}`} className=" flex flex-col gap-3">
                <img
                    src={element.imagesUrls[0]}
                    alt="house image "
                    className=" h-[320px] w-full sm:h-[220px] object-cover hover:scale-105 transition-scale duration-300"
                />

                <div className=" flex flex-col gap-2 p-3">
                <div className="">
                    <p className=" truncate capitalize  ">{element.name}</p>
                </div>

                <div className=" flex items-center gap-2 ">
                    <MdLocationOn className="h-4 w-4  text-green-700" />
                    <p className="text-black">{element.address}</p>
                </div>

                <div className="line-clamp-2">
                    <p className=" text-gray-500">{element.description}</p>
                </div>

                <div className="">
                    <p className="text-sm text-gray-950">
                        $
                        {element.offer
                            ? element.discountPrice.toLocaleString("en-US")
                            : element.regularPrice.toLocaleString("en-US")}
                        {element.type === "rent" && "/month"}
                    </p>
                </div>

                <div className=" flex gap-2">
                    <div className="">
                        {element.bedrooms > 1 ? `${element.bedrooms} beds` : `${element.bedrooms} bed`}
                    </div>

                    <div className="">
                        {element.bathrooms > 1 ? `${element.bathrooms} bath` : `${element.bathrooms} baths`}
                    </div>
                </div>
</div>
            </Link>
        </div>
    );
};

export default ListItem;
