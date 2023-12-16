import React, {useEffect, useState} from "react";
import TopHomePart from "../components/TopHomePart";
import SwiperHome from "../components/SwiperHome";
import { RenderListing } from './../components/RenderListing';

const Home = () => {
    //states

    const [offerListings, setOfferListings] = useState(null);
    const [saleListing, setSaleListing] = useState(null);
    const [rentListing, setRentisting] = useState(null);
    
    console.log(offerListings)

    //func
    useEffect(() => {

        const fetchOfferListings = async () => {
            try {
                const res = await fetch(`/api/listing/get?offer=true&limit=4`);

                const data = await res.json();

                setOfferListings(data);

                fetchSaleListings()
            } catch (error) {
                console.log(error);
            }
        };


        const fetchSaleListings = async () => {
            try {
                const res = await fetch(`/api/listing/get?type=sale&limit=4`);

                const data = await res.json();

                setSaleListing(data);

                fetchRentistings()
            } catch (error) {
                console.log(error);
            }
        };


        const fetchRentistings = async () => {
            try {
                const res = await fetch(`/api/listing/get?type=rent&limit=4`);

                const data = await res.json();

                setRentisting(data);
            } catch (error) {
                console.log(error);
            }
        };



        fetchOfferListings();
    }, []);
    return (
        <main className="">
            {/*start  top part  */}
            <TopHomePart />
            {/*end   top part  */}


            {/* start swiper  */}
            <SwiperHome offerListings={ offerListings} />
            {/* end swiper  */}


            {/*start render the lisings  */}

            {/* render offer listings  */}
            <RenderListing listingData={offerListings}
                title="recent offers "
                subTitle="show more offers "
                navigate="/search?offer=true"
            />

            

            {/* render rent  listings  */}
            <RenderListing listingData={offerListings}
                title="recent rent "
                subTitle="show more rent "
                navigate="/search?type=rent"
            />
            
            {/* render sale  listings  */}
            <RenderListing listingData={offerListings}
                title="recent sale "
                subTitle="show more sale "
                navigate="/search?type=sale"
            />
            

            {/*end render the lisings  */}



        </main>
    );
};

export default Home;
