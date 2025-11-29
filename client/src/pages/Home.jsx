import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex gap-5'>
        <NavLink to={'/signup'}>signup</NavLink>
        <NavLink to={'/signin'} >signin</NavLink>
        <NavLink to={'/hbjnsdds'} >404</NavLink>
    </div>
  )
}

export default Home