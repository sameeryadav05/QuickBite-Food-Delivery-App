import React, { useState } from 'react'
import { GrLinkNext } from "react-icons/gr";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'
const Forgotpassword = () => {

    const [step,setStep] = useState(1)
    const [next,setnext] = useState(false);
    const [email,setEmail] = useState('')
    const navigate = useNavigate()

  return (
    <div className="bg-bgColor mx-auto h-screen w-full flex items-center justify-center flex-col gap-4">

      <div className="bg-white h-fit flex items-center shadow-lg rounded-xl px-1 py-2 border border-borderColor flex-col w-[96%] lg:w-[35%] md:w-[60%] gap-4 lg:gap-6">

        {/* Header */}
        <h1 className="text-primaryColor text-3xl font-bold mb-4">
          Forgot Password
        </h1>

            <ul className="steps steps-horizontal justify-evenly w-[100%] lg:w-[90%]">
                <li  className={`step before:w-0 ${step>=1?'step-neutral':''}`}>Step 1</li>
                <li  className={`step  ${step>=2?'step-neutral':''}`}>Step 2</li>
                <li  className={`step  ${step==3?'step-neutral':''}`}>Step 3</li>
            </ul>

        {step==1? 
            <div className='w-[95%] flex justify-center items-center lg:w-[75%] '>
                <form className='w-full flex justify-center items-center flex-col'>
                    
                <label className="input validator flex border border-1 border-gray-300 mt-5">
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
                    <input type="email" placeholder="Enter your mail" required />
                    </label>
                <div className="validator-hint hidden text-sm">Enter valid email address</div>

                <div className='w-[100%] flex justify-end items-end -mb-3 mt-5 lg:mt-8'>
                    <button className='btn bg-neutral text-white p-4 rounded-md disabled:bg-[#c46f51]'>Next <GrLinkNext /></button>
                </div>
                </form>
            </div>
        :''
        }

            <div></div>

      </div>
 
    <button className='btn bg-primaryColor text-white p-4 rounded-md' onClick={()=>navigate('/signin',{replace:true})}>
        Back to Login <TiArrowBack />
    </button>
    </div>
  )
}

export default Forgotpassword;
