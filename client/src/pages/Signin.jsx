import React, { useContext, useState } from 'react'
import ramen from '../assets/ramen.png'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { LoadingContext } from '../context/Loading'
import Loader from '../components/Loader'
import api from '../api.js'
import toast from 'react-hot-toast'
import { Authcontext } from '../context/Auth.jsx'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../../firebase.js'
const Signin = () => {
  const [email,setEmail] = useState('');
  const [password,setpassword] = useState('')
  const {loading ,setLoading} = useContext(LoadingContext);
  const {isAuthenticated,setisAuthenticated,setuser} = useContext(Authcontext)
  
  const navigate = useNavigate()
  async function handleSubmit(e)
  { e.preventDefault()
    try {
      setLoading(true);
      const res = await api.post('/auth/signin',{email,password});
      console.log(res);
      console.log(res.data.user)
      setisAuthenticated(true);
      setuser(res.data.user);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.data.message =='Please Verify Your Account !')
      {
        setisAuthenticated(false);
        setuser(null);
        return navigate(`/${error.response.data.userId}/otp-verification`)
      }
      
    }
    finally{
      setLoading(false);
    }
  }

    const handleGoogleAuth = async()=>{
      try {
        setLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth,provider)
      const email = result.user.email
      const res = await api.post('/auth/googlesignin',{email})
      setisAuthenticated(true)
      setuser(res?.data?.user)  
      return navigate(`/`,{replace:true})
      } catch (error) {
        setisAuthenticated(false);
        setuser(null);
        toast.error(error?.response?.data?.message)
      }
      finally{
        setLoading(false)
      }
    }

  if(isAuthenticated)
  {
    return <Navigate to={'/'} replace/>
  }
  return (
    <>
      {loading&&<Loader/>}
        <div className="min-h-screen w-full flex justify-center items-center p-4 bg-bgColor">
          <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-1 pb-4 border-[1px] border-borderColor  md:max-w-lg lg:p-3 lg:pb-6'>
            <h1 className='flex items-center text-primaryColor gap-2 font-bold text-2xl lg:text-3xl tracking-wide'>
              <img src={ramen} className='size-14 lg:size-20 shadow-sm'/>
              QuickBite
            </h1>
            <p className='text-center text-slate-600 text-sm'>" continue to Order Delicious Food ! "</p>
    
            <div>
                <form className='flex flex-col gap-3' onSubmit={(e)=>handleSubmit(e)}>
    
                    <label className="input validator w-[90%] ml-5 mt-6">
                      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                      </svg>
                      <input type="email" placeholder="mail@gmail.com" required  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </label>
                    <p className="validator-hint hidden text-[11px] ml-5 ">Enter valid email address</p>
                  
                    <label className="input validator w-[90%] ml-5">
                      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                          ></path>
                          <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                      </svg>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        placeholder="Password"
                        title="Must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a number"
                      />
                    </label>

        <button type='submit' className='btn ml-5 w-[90%] mt-4 bg-primaryColor text-white hover:bg-hoverColor disabled:bg-[#c46f51]' disabled={loading}>Sign in</button>
    </form>
        <div className='ml-5 w-[90%] mt-1'>
          <p className='underline text-primaryColor flex justify-between text-sm lg:text-md'>
            <NavLink to={'/forgot-password'}>forgot-password ?</NavLink>
            <NavLink to={'/signup'}>create account</NavLink>
          </p>
        </div>
            </div>


            <div className="w-[90%] ml-5 mt-2 flex items-center gap-3 text-gray-400">
              <hr className="flex-1 border-gray-300" />
              <span>or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
          
      <button className="btn ml-5 w-[90%] mt-2 text-black shadow-md" 
      onClick={handleGoogleAuth}
      >
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        continue with Google
      </button>
          </div>
        </div>
    </>
  )
}

export default Signin