import React from 'react'
import Sidebar from '../Components/Sidebar'

function Message() {
  return (
    <div className='w-full font-manrope tracking-wide flex flex-row bg-[#1B2430] min-h-screen bg-cover md:justify-end'>
    <Sidebar/>
    <div className='w-full h-full min-h-screen md:w-4/6 mx-auto md:mx-0 md:mt-3'>
        <h1 className='text-white text-2xl flex w-3/12 justify-center'>Message</h1>
      </div>
  </div>
  )
}

export default Message
