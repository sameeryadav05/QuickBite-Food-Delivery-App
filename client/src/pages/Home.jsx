import React from 'react'
import { NavLink } from 'react-router-dom'
import usegetUser from '../hooks/usegetUser.jsx'
const Home = () => {
  const user = usegetUser();
  console.log(user)
  return (
    <div className='flex gap-5'>
      hello
    </div>
  )
}

export default Home