//firebase storage rules
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateComplete, updateIsLoadingUpdate, UpdateFail
  , deleteComplete, deleteIsLoading, deleteFail
  ,signoutComplete,signoutIsLoading,signoutFail
} from '../redux/user/userSlice';
const Profile = () => {
  
  //states 
  const [file, setFiles] = useState(null)
  const [filrePerc, setFilrePerc] = useState(null)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [formData,setFormDate] = useState({})
  const { currentUser } = useSelector(state => state.user)
  const { loading,error } = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const dispatch = useDispatch()

  //func
  const handleSubmit = async (e) => {
  e.preventDefault()
    try {
    
      dispatch(updateIsLoadingUpdate(true))


    // send data to backend

    const res = await fetch(`/api/user/update/${currentUser.user._id}`,
      {
        method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
    }
    )

    const data = await res.json() 

    
    if (data.success===false) {
      dispatch(UpdateFail(data.message))
      return
    }
      dispatch(updateComplete(data))
      setUpdateSuccess(true)
  } catch (error) {
    dispatch(UpdateFail)
    }
    finally {
      dispatch(updateIsLoadingUpdate(false))
    }

}
  const handleChange = (e) => {
    setFormDate(
      {
        ...formData,
        [e.target.id]:e.target.value
      }
    )
  }
  useEffect(() => {
    if (file) {
      handleFileUplaod(file)
    }
  }, [file])
  
  const handleFileUplaod=(file) => {
    // upload image from client to firebase storage
    const storage = getStorage(app)

    const fileName = new Date().getTime() + file.name
    
    const storageRef = ref(storage, fileName)
    
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    // calc the progress uploaded
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred /
        snapshot.totalBytes) * 100;
      setFilrePerc(Math.round(progress))
    }
      ,
      // handle error 
        (error)=> {
    setFileUploadError(true)
      }
      ,
        
        //get image url from firebase
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setFormDate({...formData , avatar : downloadURL})
          }
        )
      }
    
    );
  }

  const hanldeDeleteAccount=async () => {
try {
  const res =await fetch(`/api/user/delete/${currentUser.user._id}`,
  {
  method:"DELETE"
}
)

const data = await res.json()

if (data.success === false) {
  dispatch(deleteFail(data.message))
  return
}

dispatch(deleteComplete(data));


} catch (error) {
  dispatch(deleteFail(error.message))
}




  }

  const handleSignOut=async () => {
    try {
      const res =await fetch(`/api/auth/signout`)
    
    const data = await res.json()
    
    if (data.success === false) {
      dispatch(signoutFail(data.message))
      return
    }
    
    dispatch(signoutComplete(data));
    
    
    } catch (error) {
      dispatch(signoutFail(error.message))
    }
    
    
    
    
      }

  return (
    <section className=' p-5 max-w-lg mx-auto'>
      <h1
      className=' text-center text-4xl font-semibold text_media'
      >Profile</h1>
      <form className=' flex flex-col gap-3 '
      onSubmit={handleSubmit}
      >
        <input
          onChange={(e)=>setFiles(e.target.files[0])}
          type="file" ref={fileRef} hidden accept='image/*'
        
        />
        <img
        onClick={()=> fileRef.current.click()}
          src={formData.avatar || currentUser.user.avatar} alt="user image"
        className=' hover:cursor-pointer hover:opacity-80 duration-500 h-24 w-24 rounded-full object-cover self-center my-3'
        />

        {/* uploaded progress  */}
        <div className=' text-center'>
        {
          fileUploadError ?
            (
          <p>Error while uploading image image must less than 2MB</p>
            ) : filrePerc > 0 && filrePerc < 100 ? (
              <p>uploading {filrePerc }%</p>
        
            ) :filrePerc === 100?  (
          <p>uploaded successfully</p>
          ):null
        }
</div>



        <input type="text"
          placeholder=' username'
          id='username'
          className='input_field'
          defaultValue={currentUser.user.username}
          onChange={handleChange}
        />
        <input type="text"
          placeholder=' email'
          defaultValue={currentUser.user.email}
          onChange={handleChange}
          id='email'
          className='input_field'
        />
        <input type="password"
          placeholder=' password'
          id='password'
          className='input_field'
          onChange={handleChange}
        />


{loading ? (
                      <div className="lds-ellipsis">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                      </div>
                  ) : (
                    <button
                    className='main_btn'
                    >update</button>
                  )}
        
      </form>
      <div className='flex justify-between my-3'>
        <span className=' cursor-pointer'
        onClick={hanldeDeleteAccount}
        >Delte account</span>
        <span className=' cursor-pointer'
        onClick={handleSignOut}
        >Sign out</span>
      </div>
      <p className=' text-red-500'>{error?error:"" }</p>
      <p className=' text-green-700'>{updateSuccess?"user updated successfully":"" }</p>
    </section>
  )
}

export default Profile 