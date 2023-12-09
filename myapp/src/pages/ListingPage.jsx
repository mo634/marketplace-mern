import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Contact from './../components/Contact';
import { useSelector } from 'react-redux';

// import slider modules
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";

// import icons 
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';


const ListingPage = () => {
    // states
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact ,setContact] =useState(false)
    const { currentUser } = useSelector(state => state.user)
    
    

    // func
    useEffect(() => {
        const fetchListing = async () => {
            
            const listId = params.listId;


            try {
                setLoading(true);
                setError(false);



                const res = await fetch(`/api/listing/get/${listId}`);

                const data = await res.json();

                if (data.success === false) {
                    console.log(data.message);
                    setError(true);
                    setLoading(false);
                    return;
                }

                setData(data);
                setError(false);
                setLoading(false);

                console.log("data", data);
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchListing();
    }, [params.listId]);

    return (
        <main>
            {loading && <p className=" text-black font-bold text-2xl text-center my-3">loading</p>}
            {error && <p className=" text-red-500 font-bold text-2xl text-center my-3">somthing went wrong</p>}

            
            { data && !error && !loading && (
                <div>
                    {/* slider */}
                    <Swiper navigation>
                    {data?.imagesUrls?.map((url) => (
                        <SwiperSlide key={url}>
                            <div
                                className="h-[550px]"
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                    
                    {/* display the house info  */}
                    <div className="p-2 max-w-4xl mx-auto">

                        <p className=" font-semibold text-2xl">
                            {data.name} - ${" "}
                        
                            {
                                data.offer ?
                                    data.discountPrice
                                    :data.regularPrice
                            }

                            {
                                data.type === "rent" && "/month"
                            }
                        </p>
                        
                        <p className="flex gap-2 my-2 items-center text-slate-600 text-sm ">
                            <FaMapMarkerAlt className='!text-red-700' />
                            {
                                data.address
                            }
                        </p>


                        <div className="flex gap-2 my-3">
                            <p className=" text-white font-bold bg-[#333] w-fit p-1 rounded-md text-lg shadow-md">
                                {
                                    data.type === "rent" ? "for rent"
                                        :"for sale"
                                }
                            </p>

                            {
                                data.offer && (
                                    <p
                                    className="text-white font-bold bg-[#0079ff] w-fit p-1 rounded-md text-lg shadow-md"
                                    >${+data.regularPrice - +data.discountPrice} discount</p>
                                )
                            }
                        </div>

                        <p className=" text-slate-800">
                            <span className=" font-semibold text-xl">description - </span>
                                {
                                    data.description
                                }
                        </p>
                        

                        <ul className="my-3 text-blue-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'">
                            <li className=" flex gap-2  font-semibold">
                            <FaBed className='text-lg' />
                                
                                {
                                    data.bedrooms > 1 ? `${data.bedrooms} beds`:`${data.bedrooms} bed`
                                }

                            </li>
                            <li className=" flex gap-2  font-semibold">
                                <FaBath className='text-lg ' />
                                
                                {
                                    data.bathrooms > 1 ? `${data.bathrooms} paths`:`${data.bathrooms} path`
                                }

                            </li>
                            <li className=" flex gap-2  font-semibold">
                                <FaParking className='text-lg ' />
                                
                                {
                                    data.parking > 1 ? 'Parking spot' :`no parking`
                                }

                            </li>
                            <li className=" flex gap-2  font-semibold">
                            <FaChair className='text-lg' />
                            {data.furnished ? 'Furnished' : 'Unfurnished'}

                            </li>
                        </ul>


                        {
                            currentUser.user._id !== data.userRef && !contact &&(
                                <button
                                    onClick={()=> setContact(true)}
                                    className="main_btn w-full my-4">Contact to landlord</button>
                            )
                        }


                        {
                            contact && <Contact data={data} />
                        }

                    </div>

            </div>
            )
            }
        </main>
    );
};

export default ListingPage;

