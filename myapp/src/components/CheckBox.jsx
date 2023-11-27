import React from 'react'

const CheckBox = ({ data}) => {
return (
    <div className='flex gap-2'>
        <input type="checkbox" className=' w-5' id={data} />
        <span className='text-[#333] text-xl capitalize'>{data }</span>
    </div>
)
}

export default CheckBox