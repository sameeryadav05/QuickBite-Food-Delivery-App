import React, { createContext, useEffect, useState } from 'react'
import api from '../api.js'
import { Navigate, redirect} from 'react-router-dom';
import toast from 'react-hot-toast';

export const Authcontext = createContext(null);

const Auth = ({children}) => {
    const [isAuthenticated,setisAuthenticated] = useState(null)
    const [user,setuser] = useState(null)



    useEffect(()=>{
        async function verifyAuth() {
            try {
                const res = await api.get('/auth/verify-user');
                setisAuthenticated(true);
                setuser(res.data.user)
                
            } catch (error) {
                setisAuthenticated(false);
                setuser(null);
            }
        }
        verifyAuth()
    },[])

  return (
    <Authcontext.Provider value={{isAuthenticated,setisAuthenticated,user,setuser}}>
        {children}
    </Authcontext.Provider>
  )
}

export default Auth