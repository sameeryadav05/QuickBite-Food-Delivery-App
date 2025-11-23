import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loader from "./components/Loader";
import RootLayout from "./components/RootLayout";
import LoadingProvider from "./context/Loading";
import { Toaster } from "react-hot-toast";
import Auth from "./context/Auth";
// import PrivateRoute from "./layouts/PrivateRoute";
// import PublicRoute from "./layouts/PublicRoute";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OTPVerification = lazy(() => import("./components/OTP-Verification"));
const PrivateRoute = lazy(()=>import('./layouts/PrivateRoute'))
const PublicRoute = lazy(()=>import('./layouts/PublicRoute'))


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { 
        path:'/',
        element:<PrivateRoute><Home/></PrivateRoute>
      },
      { 
        path: "/signup",
        element: <PublicRoute><Signup /></PublicRoute>
      },
      { 
        path: "/signin", 
        element: <PublicRoute><Signin /></PublicRoute>
      },
      { 
        path: "/:userId/otp-verification",
        element: <PublicRoute><OTPVerification /></PublicRoute> 
      },
      { path: "*",
        element: <NotFound />
      },
    ]
  }
])

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Auth>
          <Toaster position="top-center"/>
          <Suspense fallback={<Loader/>}>
            <RouterProvider router={router} />
          </Suspense>
        </Auth>
      </LoadingProvider>
    </>
  )
}

export default App