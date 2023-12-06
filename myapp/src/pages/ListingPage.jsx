import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// import slider modules
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import {Navigation} from "swiper/modules";
import "swiper/css/bundle";

const ListingPage = () => {
    // states
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // func
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                setError(false);

                const listId = params.listId;

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

            {data && !error && !loading && (
                <div>
                    {/* {
                        console.log(data.imagesUrls)
                    } */}
                    <Swiper navigation>
                        {data.imagesUrls.map((url) => (
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
                </div>
            )}
        </main>
    );
};

export default ListingPage;
