
import { useState } from 'react'
import CheckBox from '../components/CheckBox'
import NumberField from '../components/NumberField'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux';


const createListing = () => {
    //states
    const { currentUser } = useSelector(state => state.user)
    
    const [files, setFiles] = useState([])
    
    const [imagesUploadError, setImagesUploadError] = useState(false)

    const [uploading, setUploading] = useState(false)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        imagesUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: true,
        parking: false,
        furnished: false,
    })

    const [error,setError]=useState("")


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

    const handleChange=(e) => {
        // handle checkbox "type (sale or rent)"
        console.log("first")
        if (e.target.id === "sale" || e.target.id=== "rent") {
            setFormData({
                ...formData,
                type:e.target.id
            })
        }

        //handle checkbox boolean

        if (e.target.id === "parking" || e.target.id==="furnished"|| e.target.id==="offer")
            {
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
                })
        }
        
        //handle other fields

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        }

    }

    const handleSubmit=async(e) => {
        e.preventDefault()
        setLoading(true)
        try {

            if(formData.imagesUrls.length<1)return setError("must at least 1 image upload")
            
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price')
            
            setError("")

            const res = await fetch("/api/listing/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ...formData,
                        userRef:currentUser.user._id
                    }
                )
            })
            
            const data = await res.json()

            if (!data.success) {
                setError(data.message)
            }
            
            
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            setLoading(false)
        }
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
                <input
                    onChange={handleChange}
                    value={formData.name}
                    type="text" placeholder='Name' id='name' className='input_field' />
                <textarea
                    onChange={handleChange}
                    value={formData.description}
                    type="text" placeholder='Description' id="description" className='input_field' />
                <input
                    onChange={handleChange}
                    value={formData.address}
                    type="text" placeholder='Address' id='address' className='input_field' />
                
                {/* check box */}
                <div className=' flex flex-wrap gap-4'>
                
                    <CheckBox data="sale" handleChange={handleChange} formData={ formData} />
                    <CheckBox data="rent"   handleChange={handleChange} formData={ formData}  />
                    <CheckBox data="parking"   handleChange={handleChange} formData={ formData}  />
                    <CheckBox data="furnished"   handleChange={handleChange} formData={ formData}  />
                    <CheckBox data="offer"    handleChange={handleChange} formData={ formData}  />
                </div>

                {/* number fields inputs */}
                <NumberField label="bedrooms" data="bedrooms"   formData={formData} handleChange={handleChange}/>
                <NumberField label="bathrooms" data="bathrooms"  formData={formData}  handleChange={handleChange}/>
                <NumberField label="regular price" data="regularPrice" formData={formData} handleChange={handleChange}/>
                {
                    formData.offer ?
                    <NumberField label ="discounted price" data="discountPrice" formData={formData} handleChange={handleChange}/>
                    : null
                }
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
                <button
                    
                    onClick={handleSubmit}
                    className='main_btn w-full !bg-main-color'>{
                    loading?"creaeting....":"Create Listing"
                    }
                
                </button>
                
                {
                    error ? <p className=' text-red-500 font-bold'>{ error}</p>:null
                }
            </div>

        </div>
    </main>
)
}

export default createListing