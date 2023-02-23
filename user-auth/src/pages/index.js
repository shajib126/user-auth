import { useEffect, useState } from "react"
import Profile from "./profile/Profile"
import Login from "./user/Login"
export default function Home() {
  const [token,setToken] = useState("")
  useEffect(()=>{
    const token = localStorage.getItem('token')
   console.log(token);
  },[])
    
  if(token){
    return(
      <Profile/> //also can do this like {token ? <Profile/>:<Login/>} 
    )
  }else{
    return(
      <Login/>
    )
  }
}
