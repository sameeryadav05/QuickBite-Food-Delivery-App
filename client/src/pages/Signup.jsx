import React, { useState } from 'react'
import ramen from '../assets/ramen.png'
import { NavLink } from 'react-router-dom'

const Signup = () => {
  const [role,setRole] = useState('user')
  
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4 bg-bgColor">
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-1 pb-4 border-[1px] border-borderColor  md:max-w-lg lg:p-3 lg:pb-6'>
        <h1 className='flex items-center text-primaryColor gap-2 font-bold text-2xl lg:text-3xl tracking-wider'>
          <img src={ramen} className='size-14 lg:size-20 shadow-sm'/>
          QuickBite
        </h1>
        <p className='text-center  text-sm text-slate-600'>" Create account to Order Delicious Food ! "</p>

        <div>
            <form className='flex flex-col gap-4'>
                <label className="input validator w-[90%] ml-5 mt-6" >
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder="full name"
                    pattern="^[A-Za-z ]{5,35}$"
                    title="Only letters and spaces, 5–35 characters"
                    minlength="3"
                    maxlength="30"
                   
                  />
                </label>
                <p className="validator-hint hidden text-[11px] ml-5">
                  Must be 5–35 characters (letters and spaces only)
                </p>

                <label className="input validator w-[90%] ml-5">
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
                  <input type="email" placeholder="mail@gmail.com" required />
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
                    placeholder="Password"
                    minlength="8"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                    title="Must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a number"
                  />
                </label>
                <p className="validator-hint hidden text-[11px] ml-5 ">
                    Password must be at least 6 characters and include an uppercase letter, a lowercase letter, and a number.
                </p>

              <label className="input validator w-[90%] ml-5">
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
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minlength="10"
                  maxlength="10"
                  title="Must be 10 digits"
                />
              </label>
              <p className="validator-hint hidden text-[11px] ml-5">Must be 10 digits</p>

<div className="flex justify-evenly ml-5 mt-2 w-[90%]">

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

    <button type='submit' className='btn rounded-lg ml-5 w-[90%] mt-4 bg-primaryColor text-white hover:bg-hoverColor'>Sign up</button>
</form>

        <div className='ml-5 w-[90%] mt-1 text-sm lg:text-md'>
          <p className='underline text-primaryColor flex justify-end'>
            <NavLink to={'/signin'}>Already have account ?</NavLink>
          </p>
        </div>

        </div>

            <div className="w-[90%] ml-5 mt-2 flex items-center gap-3 text-gray-400">
              <hr className="flex-1 border-gray-300" />
              <span>or</span>
              <hr className="flex-1 border-gray-300" />
            </div>


      <button className="btn ml-5 w-[90%] mt-2 text-black shadow-md rounded-lg">
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        continue with Google
      </button>

      </div>
    </div>
  )
}

export default Signup