import React from 'react'

const NumberField = ({ data}) => {
return (
    <div className='flex gap-2 items-center'>
        <input type="number" className='w-20 p-2 rounded-lg shadow-md'/>
        <span className='text-[#333] text-xl capitalize'>{data}</span>
        {
            data === "regular price" || data === "discounted price"  ?
                <span className='text-sm text-[#333] '>($/Month)</span> :
                null
        }
    </div>
)
}

export default NumberField