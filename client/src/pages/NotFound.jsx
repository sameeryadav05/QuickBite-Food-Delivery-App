import React from 'react'
import { TiArrowBack } from "react-icons/ti";
import ramen from '../assets/ramen.png'
import { NavLink } from 'react-router-dom';
import { motion } from "motion/react"
const NotFound = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-bgColor'>

        <motion.div initial={{scale:0}} whileInView={{scale:1}} transition={{duration:0.4}} exit={{scale:0}} className="mockup-browser border border-borderColor h-[54%] w-[96%] lg:w-[70%] lg:h-[80%] shadow-2xl">
            <div className="mockup-browser-toolbar">
                <div className="input">{window.location.href}</div>
            </div>

            <div className='h-full flex flex-col justify-center items-center'>
                <h1 className='font-extrabold text-primaryColor flex justify-center items-center text-[4rem] lg:text-[8rem]'>
                <span className=''>4</span>
                <img src={ramen} className='size-24 lg:size-36'/>
                <span className=''>4</span>
                </h1>
                <p className='text-md font-extrabold text-gray-400 lg:text-3xl mt-2'>“Uh-oh! This dish isn't on the menu.”</p>


                <NavLink to={-1} className={`btn btn-wide bg-primaryColor hover:bg-hoverColor mt-10 text-white mb-1`}>
                    Back <TiArrowBack />
                </NavLink>
            </div>
            
        </motion.div>
    </div>
  )
}

export default NotFound
