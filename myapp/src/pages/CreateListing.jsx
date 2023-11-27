import React from 'react'
import CheckBox from '../components/CheckBox'
import NumberField from '../components/NumberField'


const createListing = () => {
return (
    <main className="p-2  max-w-4xl mx-auto">
        {/* heading */}
        <h1 className='heading my-3'>Create a Listing</h1>

        {/*form and image "2cols"  */}
        <div className='flex flex-col sm:flex-row gap-6'>

                {/* form 1st col */}
            <form className=' flex flex-col flex-1 gap-3'>
                {/* input fields */}
                <input type="text" placeholder='Name' id='name' className='input_field' />
                <textarea type="text" placeholder='Description' id="description" className='input_field' />
                <input type="text" placeholder='Address' id='address' className='input_field' />
                
                {/* check box */}
                <div className=' flex flex-wrap gap-4'>
                                
                <CheckBox data="sell"/>
                <CheckBox data="rent"/>
                <CheckBox data="parking spot"/>
                <CheckBox data="furnished"/>
                <CheckBox data="offer" />
                    
                </div>
                <NumberField data="beds"/>
                <NumberField data="paths"/>
                <NumberField data="regular price"/>
                <NumberField data="discounted price"/>
            </form>
            
            {/* 2nd col  */}

            <div>
                <p className='text-[#333] font-bold'>Images:
                    <span className=' text-gray-500'>The first image will be the cover (max 6)</span></p>
            
                <div className=' border border-[#333] my-3 p-2'>
                    <input type="file" className='text-[#333] ' />
                
                    <button className='main_btn'>upload</button>
                </div>
                    <button className='main_btn w-full !bg-main-color'>Create Listing</button>
            </div>

        </div>
    </main>
)
}

export default createListing