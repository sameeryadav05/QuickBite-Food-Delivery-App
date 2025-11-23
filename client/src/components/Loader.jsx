import React from 'react'
import {motion} from 'motion/react'
import ramen from '../assets/ramen.png'
const Loader = () => {
  return (
    <motion.div className='fixed inset-0 z-[9999] flex justify-center items-center'>
            <div className="absolute inset-0 bg-black opacity-45 backdrop-blur-xl"></div>
            
            <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
            className='size-20 rounded-full border-8 border-t-primaryColor border-r-primaryColor border-b-transparent border-l-transparent lg:size-24 opacity-100'>
                <div className='size-16 flex justify-center items-center bg-transparent rounded-full lg:size-20'>
                    <motion.img 
                    initial={{scale:0.7,opacity:0.5}}
                    animate={{ rotate: -360,scale:1.1,opacity:1}}
                    transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                    src={ramen} className='size-12 lg:size-16'/>
                </div>
            </motion.div>
    </motion.div>
  )
}

export default Loader