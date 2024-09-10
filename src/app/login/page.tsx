import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import  { GoogleAuth } from '@/components/auth/GoogleAuth'

const LoginPage=()=>{
  return (
    <LoginForm>
      <GoogleAuth />
    </LoginForm>
    
  )
}

export default LoginPage;