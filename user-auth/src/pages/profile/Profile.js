import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
const Profile = () => {
  const [token,setToken] = useState('')
  const [user,setUser] = useState()
  const router = useRouter()
 
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
    if(!token){
      router.push('/')
    }else{
      axios.get('http://localhost:5000/user/me',{
      headers:{
        "token":token
      }
    }).then((res)=>{
      setUser(res.data?.user);
    })
    }
  },[])

  
  return (
    <div className='profile'>
      <img src="https://static.vecteezy.com/system/resources/previews/002/400/532/original/young-happy-businessman-character-avatar-wearing-business-outfit-isolated-free-vector.jpg" alt="Avatar" />
      <div className="nameandemial">
        <h3>Name: {user?.name}</h3>
        <h3>Email: {user?.email}</h3>
      </div>
    </div>
  )
}

export default Profile