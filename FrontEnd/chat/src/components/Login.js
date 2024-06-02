import React, { useEffect, useMemo, useRef,useState } from 'react'
import img from "../../src/loginChat.jpg"
import {GrChat} from "react-icons/gr"
import {TfiWorld} from "react-icons/tfi"
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"
import axios from "axios"
import {toast,Toaster} from "react-hot-toast"
import Lottie from "lottie-react"
import animationData from "../assetes/Animation - 1713426665794.json"

function Login() {
  const usernameRef = useRef("")
  const passwordRef = useRef("")
  const [loading, setLoading] = useState(false);
  console.log(loading)
  const saveData = async () => {
    setLoading(true)
    toast.loading("Loading")
      try {
        
        await axios.post("https://chatsphere-zeyf.onrender.com/login", {
          username : usernameRef.current.value,
          password:passwordRef.current.value
        }).then((res)=>{
          console.log("Res",res)
          if(res===null){
           console.log("Hello")
          }else{
            if(res.data==="Success"){
              setTimeout(()=>{
                window.location.href=`/main/${usernameRef.current.value}`
            },1500)
  
              toast.success("Login Successfully!")
            }
            if(res.data==="NotFound"){
              toast.error("User Not Found")
            }
            if(res.data==="incorrect password"){
              toast.error("Incorrect Username or Password")
            }
          }
        })
      } catch (error) {
      }
      finally{
        setLoading(false)
      }
  };
  return (
   <motion.div
    initial={{ opacity: 0, x: '100vw' }} // Slide in from the right
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100vw' }} // Slide out to the left
    transition={{ type: 'tween', duration: 0.6 }}
  >
  <div className='px-5 py-5 w-full h-screen  '>
  <Toaster/>   
    <div className='w-full h-full phone:h-5/6 '>
    <div className='shadow-2xl w-full h-full rounded-3xl flex justify-between phone:justify-center'>
      <img src={img} className='w-1/2 h-full rounded-tl-3xl rounded-bl-3xl phone:hidden'/>
      <div className='w-1/2 flex flex-col items-center gap-24 justify-center phone:w-full'>
      <div className='w-1/2 flex flex-col items-center gap-3 py-5 text-center phone:w-full'>
      <h1 className='flex items-center gap-5 text-5xl phone:text-2xl'><GrChat className='text-7xl text-green-500 phone:text-4xl'/>ChatSphere<TfiWorld className='text-7xl text-blue-700 phone:text-4xl'/></h1>
      <hr className='w-48'/>
      <h1>Where <span className='text-blue-700'>Words</span> Create <span className='text-green-500 '>Worlds</span>.</h1>
      </div>
      <div className='flex flex-col items-center gap-5 w-full'>
        <input ref={usernameRef} placeholder='Username' className='border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:w-4/5'/>
        <input ref={passwordRef} placeholder='Password' className='border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:w-4/5'/>
        <button onClick={saveData}  className='bg-purple-700 text-center w-1/2 rounded-3xl px-5 py-3 font-extrabold  text-white phone:w-4/5'>Login</button>
        <h1 className='text-gray-400 flex items-center gap-1 phone:text-sm'>Don't have an Account?<Link to="/register" className='text-green-500'>Register</Link></h1>
      </div>
      </div>
    </div>
    </div>
 
  </div>
  </motion.div>
  )
}

export default Login