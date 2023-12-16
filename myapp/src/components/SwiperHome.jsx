import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

const SwiperHome = ({offerListings}) => {
    SwiperCore.use([Navigation]);

    return (
        <div className="w-full">
            <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                style={{
                                    background: `url(${listing.imagesUrls[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                                className="h-[500px]"
                                key={listing._id}
                            ></div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default SwiperHome;
