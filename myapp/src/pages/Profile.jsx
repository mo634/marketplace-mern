import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser}= useSelector(state=>state.user)
  return (
    <section className=' p-5 max-w-lg mx-auto'>
      <h1
      className=' text-center text-4xl font-semibold text_media'
      >Profile</h1>
      <form className=' flex flex-col gap-3 '>
        <img src={currentUser.user.avatar} alt="user image"
        className=' h-24 w-24 rounded-full object-cover self-center my-3'
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