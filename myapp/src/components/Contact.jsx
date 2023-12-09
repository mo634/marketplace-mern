import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({ data }) => {

    //states
    const [landor, setLandor] = useState(null)
    const [message,setMessage]= useState(null)

    //func
    const handleChange=(e) => {
        setMessage(e.target.value)
    }
    useEffect(() => {
        const fetchCreator = async () => {

            try {
                const res = await fetch(`/api/user/${data.userRef}`)

                const userdata = await res.json()


                setLandor(userdata)
    
                console.log(userdata)
            } catch (error) {
                console.log(error)
            }
            
        }


        fetchCreator()
    }, [data.userRef])
    
return (
    <>
        {
            landor && (
                <div className='flex flex-col gap-3'>

                    <p>Contact
                        <span className='font-semibold'> {landor.username}</span>
                    
                        {" "}for {" "}
                    
                        {data.name}
                    
                    </p>

                    <textarea
                        name="message" id="message" rows="2"
                        className='p-2 w-full rounded-md shadow-md focus:outline-none'
                        placeholder='enter your message'
                        onChange={handleChange}
                    ></textarea>

                    <Link to={
                        `mailto:${landor.email}?subject=Regarding ${data.name}&body=${message}`

                    }
                    className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >send message</Link>

                </div>
            )
        }
    </>
)
}

export default Contact