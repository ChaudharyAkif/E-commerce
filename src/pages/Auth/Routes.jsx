import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Register/Register'
import SignIn from './Login/Login'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ConfirmEmail from './confirmEmail/confirmEmail'
import ResetPassword from './ResetPassword/ResetPassword'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route  path="/signup" element={<Signup /> }/>
      <Route  path="/login" element={<SignIn /> }/>
      <Route  path="/confirmemail" element={<ConfirmEmail /> }/>
      <Route  path="/forgetpassword" element={<ForgetPassword /> }/>
      <Route path="/reset-password" element={<ResetPassword/>} />
    </Routes>
  )
}

export default AuthRoutes



