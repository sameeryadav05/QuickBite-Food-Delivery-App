import React, { useContext, useEffect, useState } from 'react'
import ramen from '../assets/ramen.png'
import Loader from './Loader'
import { Authcontext } from '../context/Auth.jsx'
import { LoadingContext } from '../context/Loading'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../../firebase.js'
import toast from "react-hot-toast";
import Api from '../api.js'
import { useNavigate } from 'react-router-dom'

const GoogleAuthModal = () => {

    const [mobile,setMobile] = useState('')
    const [role,setRole] = useState('user')


  const {loading ,setLoading} = useContext(LoadingContext);
  const {isAuthenticated,setisAuthenticated,setuser} = useContext(Authcontext)
const navigate = useNavigate()
  const handleGoogleAuth = async(e)=>{
    e.preventDefault();
    try {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
    const fullname=result.user.displayName;
    const email = result.user.email
    const res = await Api.post('/auth/googlesignup',{fullname,role,mobile,email})
    setisAuthenticated(true)
    setuser(res?.data?.user)
    return navigate(`/`,{replace:true})
    } catch (error) {
      setisAuthenticated(false);
        toast('something went wrong ', {icon: '⚠️'});
    }
    finally{
        setLoading(false)
    }
  }

  return (
    <>
      <dialog id="my_modal_3" className="modal">
              {loading&&<Loader/>}
            <div className="modal-box w-[90%]">
                <form method="dialog w-full" onSubmit={(e)=>handleGoogleAuth(e)}>

            <h1 className='flex items-center text-primaryColor font-bold text-2xl lg:text-3xl'>
              <img src={ramen} className='size-14 lg:size-20 shadow-sm'/>
              QuickBite
            </h1>

            <label className="input validator w-[90%] ml-5 mt-3">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <input
                  type="tel"
                  className="tabular-nums"
                  required
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minlength="10"
                  maxlength="10"
                  title="Must be 10 digits"
                />
              </label>
            <p className="validator-hint hidden text-[11px] mt-2 ml-5">Mobile Number required it Must be 10 digits</p>

        <div className="flex justify-evenly ml-5 mt-6 w-[90%]">

            <button 
                type="button" 
                onClick={() => setRole("user")}
                className={`btn flex-1 rounded-lg
                ${role === "user" ? "bg-[#ff4d2d] text-white hover:bg-hoverColor" : ""}`}
            >
                user
            </button>

        <button 
          type="button" 
          onClick={() => setRole("owner")}
          className={`btn  flex-1 rounded-lg
            ${role === "owner" ? "bg-[#ff4d2d] text-white hover:bg-hoverColor" : ""}`}
        >
          owner
        </button>

        <button 
          type="button" 
          onClick={() => setRole("deliveryboy")}
          className={`btn  flex-1 rounded-lg
            ${role === "deliveryboy" ? "bg-[#ff4d2d] text-white hover:bg-hoverColor" : ""}`}
        >
          Delivery boy
        </button>

      </div>


            <button type="submit" className="btn ml-5 w-[90%] mt-6 text-black shadow-md">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                continue with Google
            </button>

                <p onClick={() => document.getElementById("my_modal_3").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</p>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default GoogleAuthModal
