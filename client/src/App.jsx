import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Home from "./pages/Home";
import Loader from "./components/Loader";
import RootLayout from "./components/RootLayout";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OTPVerification = lazy(() => import("./components/OTP-Verification"));



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
      <Suspense fallback={<Loader/>}>
        <RouterProvider router={router} />
      </Suspense>

    </>
  )
}

export default App