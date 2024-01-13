import React from 'react'
import { FiGithub } from 'react-icons/fi'

function Hero(props) {
  return (
    <div className='text-center'>
      <button className="text-2xl flex items-center justify-evenly w-40 m-auto bg-slate-800 text-white border-2 border-white rounded-3xl p-2" onClick={props.authenticateUser}>Let's Connect<FiGithub className="text-6xl"/></button>
    </div>
  )
}

export default Hero
