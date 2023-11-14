//firebase storage rules
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  
  //states 
  const [file, setFiles] = useState(null)
  const [filrePerc, setFilrePerc] = useState(null)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData,setFormDate] = useState({})
  const { currentUser } = useSelector(state => state.user)
  const fileRef = useRef(null)
  //func
  console.log(filrePerc)
  console.log(formData)

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
  return (
    <section className=' p-5 max-w-lg mx-auto'>
      <h1
      className=' text-center text-4xl font-semibold text_media'
      >Profile</h1>
      <form className=' flex flex-col gap-3 '>
        <input
          onChange={(e)=>setFiles(e.target.files[0])}
          type="file" ref={fileRef} hidden accept='image/*' />
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
        />
        <input type="text"
          placeholder=' username'
          id='username'
          className='input_field'
        />
        <input type="text"
          placeholder=' username'
          id='username'
          className='input_field'
        />
        <button
        className='main_btn'
        >update</button>
      </form>
      <div className='flex justify-between my-3'>
      <span>Delte account</span>
      <span>Sign out</span>
      </div>
    </section>
  )
}

export default Profile