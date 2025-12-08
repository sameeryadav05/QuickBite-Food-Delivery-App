import React from 'react'
import { NavLink } from 'react-router-dom'
import usegetUser from '../hooks/usegetUser.jsx'
import UserDasboard from '../components/UserDashboard.jsx'
import OwnerDashborad from '../components/OwnerDashboard.jsx'
import DeliveryboyDashboard from '../components/DeliveryboyDashboard.jsx'
const Home = () => {
  const user = usegetUser();
  console.log(user)
  return (
    <div className='container mx-auto w-screen min-h-screen flex flex-col  items-center'>
      {user.role=="user"?<UserDasboard/>:null}
      {user.role=="owner"?<OwnerDashborad/>:null}
      {user.role=="deliveryboy"?<DeliveryboyDashboard/>:null}
    </div>
  )
}

export default Home