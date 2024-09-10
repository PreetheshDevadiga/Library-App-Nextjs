import React from 'react'
import RegisterForm  from '@/components/auth/SignupForm'
 import { GoogleAuth } from '@/components/auth/GoogleAuth'
const RegisterPage=()=>{
  return (
    <RegisterForm >
      <GoogleAuth />
    </RegisterForm>
    
  )
}

export default  RegisterPage ;
