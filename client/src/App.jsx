import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import NotFound from './pages/NotFound'
import OTPVerification from './components/OTP-Verification'
import RootLayout from './components/RootLayout'
import Home from './pages/Home'



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {path:'/',element:<Home/>},
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      { path: "/otp-verification", element: <OTPVerification /> },
      { path: "*", element: <NotFound />},
    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App