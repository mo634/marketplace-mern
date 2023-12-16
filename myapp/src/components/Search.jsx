import React, {useEffect, useState} from "react";
import CheckBox from "./CheckBox";
import { useNavigate } from 'react-router-dom';
import ListItem from "./ListItem";

const Search = () => {
    // states
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore,setShowMore] = useState(false)
    const [formData, setFormData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    });
    console.log(listings);


    //func
    useEffect(() => {
        // get data from url 
        const urlParams = new URLSearchParams(location.search)

        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        // update states with the url params 
        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setFormData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchingData = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${searchQuery}`)

            const data = await res.json()
            
            if (data.length>8) {
                setShowMore(true)
            }
            else {
                setShowMore(false)
            }

            setListings(data)

            setLoading(false)
        }

        fetchingData()
    },[location.search])
    const handleChange = (e) => {
        if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (e.target.id === "searchTerm") {
            setFormData({
                ...formData,
                searchTerm: e.target.value,
            });
        }

        if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false,
            });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "created_at";

            const order = e.target.value.split("_")[1] || "desc";

            setFormData({
                ...formData,
                sort,
                order,
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams() 

        urlParams.set('searchTerm', formData.searchTerm);
        urlParams.set('type', formData.type);
        urlParams.set('parking', formData.parking);
        urlParams.set('furnished', formData.furnished);
        urlParams.set('offer', formData.offer);
        urlParams.set('sort', formData.sort);
        urlParams.set('order', formData.order);
        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    }
    const handleshowMore =async () => {
        const numberOfListings = listings.length

        const startIndex = numberOfListings 
        
        const urlParams = new URLSearchParams(location.search)

        urlParams.set("startIndex", startIndex)
        
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`)
        
        const data = await res.json()
        
        setListings([...listings, ...data])
        
        if (data.length>9) {
            setShowMore(true)
        }
        else {
            setShowMore(false)
        }


    }
    return (
        <main className="gap-3 flex flex-col md:flex-row p-3">
            {/* left side  */}

            <div className=" w-fit flex-1 p-7 border-b-3 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className=" flex flex-col gap-8 ">
                    {/*start  search part  */}

                    <div className=" flex items-center gap-2">
                        <label className=" whitespace-nowrap font-bold">Search Term : </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            placeholder="Search..."
                            id="searchTerm"
                            className="input_field w-fit"
                        />
                    </div>

                    {/*end  search part  */}

                    {/*start  check box part */}
                    <div className=" flex  flex-wrap gap-2">
                        <span className=" font-bold">Type : </span>
                        <CheckBox handleChange={handleChange} data={"all"} formData={formData} label={"Sale & Rent"} />

                        <CheckBox handleChange={handleChange} data={"rent"} formData={formData} label={""}/>

                        <CheckBox handleChange={handleChange} data={"sale"} formData={formData} label={""}/>
                        <CheckBox handleChange={handleChange} data={"offer"} formData={formData} />
                    </div>

                    <div className="flex  flex-wrap gap-2">
                        <span className=" font-bold">Amenities:</span>
                        <CheckBox handleChange={handleChange} data={"parking"} formData={formData} />
                        <CheckBox handleChange={handleChange} data={"furnished"} formData={formData} /> 

                    
                    </div>
                    {/*end   check box part */}

                    {/*start select option part  */}

                    <div className=" flex items-center gap-2 flex-wrap">
                        <label>sort : </label>

                        <select id="sort_order" className="p-2 border rounded-lg" onChange={handleChange}>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to hight</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>

                    {/*end select option part  */}

                    {/* serach btn  */}

                    <button className="main_btn">Search</button>
                </form>
            </div>

            {/* right side  side  */}
            <div className="">
                <h1 className="mt-8 text-3xl font-semibold border-b">Listing result</h1>
            
                <div className="p-7">
                    {
                        // handle not found case 
                    !loading && listings.length === 0 && (
                        <p className=" font-bold text-center text-xl">Listing not found </p>
                        )
                    }


                    {
                        //handle loading case 
                        loading && (
                            <p className=" font-bold text-center text-xl">Loading...</p>
                        )
                    }

                    <div className=" flex flex-wrap gap-3">
                    {
                        //render data 
                        !loading &&
                        listings &&
                        (
                            listings.map((element) => (
                                <ListItem key={element._id} element={element }/>
                            ))
                        )
                    }
                    </div>

                    {/* show more btn  */}
                    {
                        showMore && (
                            <button
                    onClick={handleshowMore}
                    >show more</button>
                        )
                    }

                    </div>
            
            
            </div>
        </main>
    );
};

export default Search;
