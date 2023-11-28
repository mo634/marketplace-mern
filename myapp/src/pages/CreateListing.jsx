
import { useState } from 'react'
import CheckBox from '../components/CheckBox'
import NumberField from '../components/NumberField'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'


const createListing = () => {
    //states

    const [files, setFiles] = useState([])
    
    const [imagesUploadError, setImagesUploadError] = useState(false)

    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        imagesUrls:[],
    })

    

    //func
    const handleUpload = () => {
        if (files.length > 0 && files.length + formData.imagesUrls.length < 7) {


            setUploading(true);
            setImagesUploadError(false);


            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }

            Promise.all(promises)
                .then((urls) => {
                    console.log(urls)
                    setFormData({
                        ...formData,

                        imagesUrls: formData.imagesUrls.concat(urls),
                
                    })

                    setImagesUploadError(false)
                    setUploading(false)
                }).catch(
                    (error) => {
                        setImagesUploadError('Image upload failed (2 mb max per image)')
                        setUploading(false)
                    }
                )
            
        }
        else {
            setImagesUploadError("You can only upload 6 images per listing")

            setUploading(false)
        }
    }

    const storeImage=(file) => {
        return new Promise((resolve, reject) => {
            
            const storage = getStorage(app)

            const fileName = new Date().getTime() + file.name 
            
            const storageRef = ref(storage, fileName)
            
            const uploadTask = uploadBytesResumable(storageRef, file)
            
            uploadTask.on("state_changed",(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
                (err) => {
                    reject(err)
                }
                ,
                
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleRemoveImage=(index) => {
        setFormData({
            ...formData,
            imagesUrls:formData.imagesUrls.filter((_,i)=> i !== index)
        })
    }

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


                <input
                onChange={(e) => setFiles(e.target.files)}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
            />
                
                    <button disabled={uploading} className='main_btn my-3  sm:w-full'
                        type='button'
                        onClick={handleUpload}
                    >
                        {
                            uploading ? "uploading..."
                                :"upload"
                        }
                    </button>

                    {
                        formData?.imagesUrls ?
                        formData.imagesUrls.map((url,index) => (
                        <div
                                        key={url}
                                        className='flex justify-between p-3 border items-center'
                            >
                                
                                    <img
                                    src={url}
                                    alt='listing image'
                                    className='w-20 h-20 object-contain rounded-lg'
                            />
                                
                                    <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                    >
                                    Delete
                                </button>
                                
                                </div>
                        ))
                        : null
                    }
                    {
                        imagesUploadError && <p className=' text-red-500'>
                            {imagesUploadError}
                        </p>
                    }
                </div>
                    <button className='main_btn w-full !bg-main-color'>Create Listing</button>
            </div>

        </div>
    </main>
)
}

export default createListing