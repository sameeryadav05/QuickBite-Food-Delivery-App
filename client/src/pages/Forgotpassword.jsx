import React, { useContext, useState } from 'react'
import { GrLinkNext } from "react-icons/gr";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { LoadingContext } from '../context/Loading';
import api from '../api.js'
import toast from 'react-hot-toast';
import Loader from '../components/Loader.jsx';

const Forgotpassword = () => {

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const {loading,setLoading} = useContext(LoadingContext)

  const steps = ['Email', 'OTP Verification', 'Reset Password'];

  const handleEmail = async(e)=>{
    try {
      e.preventDefault()
      setLoading(true)
      const res = await api.post('/auth/forgotpassword-otp',{email})
      setStep(1)
      toast.success(res.data.message)
      
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    } 
  }

const handleOtp = async (e) => {
  e.preventDefault();

  const cleanOtp = otp.trim();

  if (!/^\d{4}$/.test(cleanOtp)) {
    toast.error("Enter valid 4 digit code");
    return;
  }

  try {
    setLoading(true);

    const res = await api.post('/auth/verify-reset', {
      email,
      otp: cleanOtp
    });
    toast.success(res.data.message);
    setStep(2);


  } catch (error) {
    toast.error(error?.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};

  const handleNewpassword = async (e)=>{
    try {
      e.preventDefault()
      setLoading(true)
      const res = await api.post('/auth/resetpassword',{email,newpassword})
      toast.success(res.data.message);
      setStep(3);

      navigate('/signin',{replace:true})
      setLoading(false)

    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
      setLoading(false)
    }

  }


  return (
    <>
    {loading&&<Loader/>}
    <div className="bg-bgColor mx-auto h-screen w-full flex items-center justify-center flex-col gap-4">

      <div className="bg-white h-fit flex items-center shadow-lg rounded-xl px-0 py-4 border border-borderColor flex-col w-[96%] lg:w-[35%] md:w-[60%] gap-4 lg:gap-6">

        <h1 className="text-primaryColor text-3xl font-bold mb-4">
          Forgot Password
        </h1>

        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={step} alternativeLabel
    sx={{
          // ===== STEP ICON COLORS =====
          '& .MuiStepIcon-root': {
            color: '#cbd5e1', // inactive (gray)
          },
          '& .MuiStepIcon-root.Mui-active': {
            color: '#ff4d2d', // active (orange)
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#22c55e', // completed (green)
          },

          // ===== CONNECTOR LINE COLORS =====
          '& .MuiStepConnector-line': {
            borderColor: '#cbd5e1', // default gray line
          },
          '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
            borderColor: '#ff4d2d', // active line (orange)
          },
          '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
            borderColor: '#22c55e', // completed line (green)
          },

          // ===== LABEL COLORS =====
          '& .MuiStepLabel-label': {
            color: '#94a3b8',
          },
          '& .MuiStepLabel-label.Mui-active': {
            color: '#ff4d2d',
            fontWeight: 600,
          },
          '& .MuiStepLabel-label.Mui-completed': {
            color: '#16a34a',
            fontWeight: 600,
          },
        }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* ================= STEP 0 : EMAIL ================= */}
        {step === 0 && (
          <div className='w-[95%] flex justify-center items-center lg:w-[90%]'>
            <form className='w-full flex justify-center items-center flex-col gap-5'
             onSubmit={(e)=>handleEmail(e)}>

              <label className="input validator flex border border-gray-300">
                <input
                  type="email"
                  placeholder="Enter your mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden text-sm">Enter valid email address</div>
              <div className='w-full flex justify-end'>
                <button className='btn bg-primaryColor text-white p-4 rounded-md'>
                  Next <GrLinkNext />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* step 1 */}

         {step === 1 && (
          <div className='w-[95%] flex justify-center items-center lg:w-[90%]'>
            <form className='w-full flex justify-center items-center flex-col gap-5' onSubmit={(e)=>handleOtp(e)}>

              <label className="input validator flex border border-gray-300">
                <input
                  type="text"
                  placeholder="Enter 4-digits verification code"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,4}$/.test(value)) {
                      setOtp(value);
                    }
                  }}
                />
              </label>
            <div className="validator-hint hidden text-sm">Enter valid 4 digit code</div>
              <div className='w-full flex justify-end'>
                <button  disabled={otp.length !== 4} type='submit' className='btn bg-primaryColor text-white p-4 rounded-md'>
                  Next <GrLinkNext />
                </button>
              </div>
            </form>
          </div>
        )}



        {/* step 2 */}

           {step === 2&& (
          <div className='w-[95%] flex justify-center items-center lg:w-[90%]'>
            <form className='w-full flex justify-center items-center flex-col gap-5'
              onSubmit={(e)=>handleNewpassword(e)}>

              <label className="input validator flex border border-gray-300">
                <input
                  type="password"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden text-sm">password must contain 6 chracter,1 uppercase,1 special chracter </div>
              <div className='w-full flex justify-end'>
                <button className='btn  bg-primaryColor text-white p-4 rounded-md'>
                  reset
                </button>
              </div>
            </form>
          </div>
        )}

 

      </div>

      <button
        className='btn bg-primaryColor text-white p-4 rounded-md'
        onClick={() => navigate('/signin', { replace: true })}>
        Back to Login <TiArrowBack />
      </button>

    </div>

    </>
  )
}

export default Forgotpassword;
