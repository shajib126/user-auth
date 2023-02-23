import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import cogoToast from 'cogo-toast'
import axios from 'axios'
import Link from 'next/link'

const Login = () => {
    let {emailRef,passwordRef,confirmPasswordRef} = useRef()
    const [token,setToken] = useState('')
    const router = useRouter()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            router.push('/profile/Profile')
        }
    },[])

    const loginHandler = ()=>{
        const email = emailRef.value;
        const password = passwordRef.value;
        const confirmPassword = confirmPasswordRef.value;
      if(!email || !password || !confirmPassword){
        cogoToast.error("All field Are required")
      }else if(password !== confirmPassword){
        cogoToast.error("Password does not match")
      }else{
        axios.post('http://localhost:5000/user/login',{email,password,confirmPassword}).then((res)=>{
            if(res.success === false){
                cogoToast.error(res.message)
            }else if(res.status === 500){
                cogoToast.error(res.message)
            }else{
                cogoToast.success('Logged In')
                console.log(res.data);
                localStorage.setItem("token",res.data.token)
                router.push('/profile/Profile')
            }
           })
      }
      
    }
  return (
    <div className='login'>
        <h2>Login</h2>
        <div className="input">
            <label htmlFor="email">Email</label>
            <input ref={(input)=>emailRef = input} type="email" placeholder='xyz@exampl.com' />
        </div>
        <div className="input">
            <label htmlFor="password">Password</label>
            <input ref={(input)=>passwordRef = input} type="password" placeholder='******' />
        </div>
        <div className="input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input ref={(input)=>confirmPasswordRef = input} type="password" placeholder='*****' />
        </div>
        <span>New User? <Link href='/'>Sign Up</Link> </span>
        <button onClick={loginHandler}>Login</button>
    </div>
  )
}

export default Login