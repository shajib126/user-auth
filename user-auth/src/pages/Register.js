'use client';
import axios from "axios"
import { useRef, useState } from "react"
import { useRouter } from 'next/navigation';
import cogoToast from "cogo-toast";
import Link from "next/link";

const Register = () => {
  let {emailRef,nameRef,passwordRef} = useRef()
  const router = useRouter()
  const submitRegister = ()=>{
    const email = emailRef.value;
    const name = nameRef.value;
    const password = passwordRef.value
    if(!email || !name || !password){
        cogoToast.error("All fild Required!")
    }else{
        axios.post('http://localhost:5000/user/register',{name,email,password},{
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      cogoToast.success('Successfully Registered')
      router.push('user/Login')
    })
    }
    
  }
  return (
    <div className="register">
        <h2>Register</h2>
        <input ref={(input)=>nameRef = input} type="name" placeholder="John Doe" />
        <input ref={(input)=>emailRef = input} type="email" placeholder="xyz@example.com" />
        <input ref={(input)=>passwordRef = input} type="password" placeholder="******" />
        <span>Already Registered? <Link href='/user/Login'>Sign In</Link></span>
        <button onClick={submitRegister}>Register</button>
    </div>
  )
}

export default Register