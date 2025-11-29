import React, { useContext } from 'react'
import { Authcontext } from '../context/Auth'

const usegetUser = () => {

    const {user} = useContext(Authcontext)

    return user;
}

export default usegetUser