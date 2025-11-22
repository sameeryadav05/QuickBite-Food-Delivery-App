import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex gap-5'>
        <NavLink to={'/signup'}>signup</NavLink>
        <NavLink to={'/signin'} >signin</NavLink>
        <NavLink to={'/otp-verification'} >otp</NavLink>
        <NavLink to={'/otp-verification1212'} >404</NavLink>
    </div>
  )
}

export default Home