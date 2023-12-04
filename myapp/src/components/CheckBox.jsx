import React from 'react'

const CheckBox = ({ handleChange, data, formData }) => {
    
    let isChecked =false
    // chcek for the type (sale or rent )
    if (data === "rent" || data === "sale") {
        isChecked = formData.type === data;
    }
    else (
        isChecked =formData[data]
    )


return (
    <div className='flex gap-2'>
        <input type="checkbox" className=' w-5' id={data}
            onChange={handleChange}
            checked={isChecked||false}
        />
        <span className='text-[#333] text-xl capitalize'>{data}</span>
    </div>
)
}

export default CheckBox