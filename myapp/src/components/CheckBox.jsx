import React from 'react';

const CheckBox = ({ handleChange, data, formData = {}, label="" }) => {
    let isChecked = false;
    console.log( formData.type)

    // Check for the type (sale, rent, all, or other)
    if (data === "rent" || data === "sale" || data === "all") {
        isChecked = formData.type === data;
    } else {
        isChecked = formData[data] || false;  // Ensuring isChecked is always a boolean
    }

    return (
        <div className='flex gap-2'>
            <input
                type="checkbox"
                className='w-5'
                id={data}
                onChange={handleChange}
                checked={isChecked}  // Directly using isChecked which is always a boolean
            />
            <span className='text-[#333] text-xl capitalize'>
                {label || data}
            </span>
        </div>
    );
};

export default CheckBox;
