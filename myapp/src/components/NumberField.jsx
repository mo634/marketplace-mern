import React from 'react'

const NumberField = ({ handleChange, data, formData,label }) => {

return (
    <div className='flex gap-2 items-center'>
        <input type="number" className='w-20 p-2 rounded-lg shadow-md'
            id={data}
            value={formData[data]}
            
        onChange={handleChange}
        />
        <span className='text-[#333] text-xl capitalize'>{label}</span>
        {
            label === "regular price" || label === "discounted price"  ?
                <span className='text-sm text-[#333] '>
                    
                    {
                        formData.type === "rent" ?("$/Month"):null
                    }
                
                </span> :
                null
        }
    </div>
)
}

export default NumberField