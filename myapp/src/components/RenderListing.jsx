import {Link} from "react-router-dom";
import ListItem from './ListItem';

export const RenderListing = ({listingData, title, subTitle, navigate}) => {
    return (
        <>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {listingData && listingData.length > 0 && (
                <>
                <div className="">
                    <div className="">
                    <h2 className="text-3xl">{title}</h2>
                    <Link to={navigate} className="hover:underline text-main-color">{subTitle}</Link>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                        {
                            listingData.map((listing) =>(
                                <ListItem element={listing} key={listing._id}/>
                            ))
                        }
                </div>
                </>
            )}
        </div>
            <hr />
        </>
    );
};
