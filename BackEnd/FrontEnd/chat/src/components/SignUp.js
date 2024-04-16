import React, { useEffect, useRef, useState } from "react";
import img from "../../src/registerChat.jpg";
import { GrChat } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BsFillEyeSlashFill, BsEyeFill } from "react-icons/bs";
import {MdDownloadDone} from "react-icons/md"
import {RxCross2} from "react-icons/rx"
import {toast,Toaster} from "react-hot-toast"


function SignUp() {
  const [userData, setUserData] = useState([]);
  const [userNameData, setUserNameData] = useState([]);
  const [userNameCheck, setUserNameCheck] = useState();
  const [image,setImage]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://chatsphere-zeyf.onrender.com/myUsers");
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(()=>{
    console.log(image)
  },[image])

  const [passCheck, setPassCheck] = useState(false);
  const fnameRef = useRef("");
  const lnameRef = useRef("");
  const emailRef = useRef("");
  const mobileRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const imgRef = useRef()

  const passwordCheck = () => {
    setPassCheck(!passCheck);
  };

  const saveData = async () => {
    if (
      fnameRef.current.value &&
      lnameRef.current.value &&
      emailRef.current.value &&
      mobileRef.current.value &&
      usernameRef.current.value &&
      passwordRef.current.value &&
      image
    ) {
      const formData = new FormData();
      formData.append('fname', fnameRef.current.value);
      formData.append('lname', lnameRef.current.value);
      formData.append('email', emailRef.current.value);
      formData.append('mobile', mobileRef.current.value);
      formData.append('username', usernameRef.current.value);
      formData.append('password', passwordRef.current.value);
      formData.append('profilePhoto', image);
      try {
        await axios.post("https://chatsphere-zeyf.onrender.com/register",formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
          if(res.data==="Created"){
            setTimeout(()=>{
              window.location.href=`/login`
            },1000)
            toast.success("Account Created Successfully!")
          }
          console.log(res.data)
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      // Display an error message or handle the case where fields are not filled
      toast.error("Kindly Fill All Fields")
    }
  };
  
  return (
    <motion.div
    initial={{ opacity: 0, x: '-100vw' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100vw' }}
    transition={{ type: 'tween', duration: 0.6 }}
  >
    <div className="px-5 py-5 w-full h-screen transition-all ease-in-out duration-700">
      <Toaster/>
      <div className="shadow-2xl h-full rounded-3xl flex justify-between">
        <div className="w-1/2 flex flex-col items-center gap-24 justify-center">
          <div className="w-1/2 flex flex-col items-center gap-3 py-5 text-center">
            <h1 className="flex items-center gap-5 text-5xl">
              <GrChat className="text-7xl text-green-500" />
              ChatSphere
              <TfiWorld className="text-7xl text-blue-700" />
            </h1>
            <hr className="w-48" />
            <h1>
              Where <span className="text-blue-700">Words</span> Create{" "}
              <span className="text-green-500 ">Worlds</span>.
            </h1>
          </div>
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex items-center gap-5">
              <input
                required
                ref={fnameRef}
                type="text"
                placeholder="First Name"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none"
              />
              <input
                required
                ref={lnameRef}
                type="text"
                placeholder="Last Name"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none"
              />
            </div>
            <div className="flex items-center gap-5">
              <input
                required
                ref={emailRef}
                type="email"
                placeholder="Email ID"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none"
              />
              <input
                required
                ref={mobileRef}
                type="number"
                placeholder="Mobile No"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none"
              />
              <input onChange={(e)=>{
                setImage(e.target.files[0])
              }} ref={imgRef} type="file" name="profilePhoto"/>
            </div>
            <div className="flex  items-center gap-5">
              <div className="w-1/2 flex gap-2  relative">
                <input
                  required
                  ref={usernameRef}
                  onChange={() => {
                    const check = userData.find((user) => user === usernameRef.current.value );

                    check ? setUserNameCheck(false) : setUserNameCheck(true)
                  }}
                  placeholder="Username"
                  className="border-x-2 border-y-2 pr-10 border-gray-500 px-5 py-3 w-full rounded-3xl outline-none"
                />
                {userNameCheck ? (
                  <button
                    className=" text-3xl py-3  absolute right-0 top-0 bottom-0 mr-5 mt-auto mb-auto text-green-500 transition-all ease-in-out duration-500"
                  >
                    <MdDownloadDone />
                  </button>
                ) : (
                  <button
                    className=" text-3xl py-3  absolute right-0 top-0 bottom-0 mr-5 mt-auto mb-auto text-red-500 transition-all ease-in-out duration-500"
                  >
                    <RxCross2 />
                  </button>
                )}
              </div>
              <div className="w-1/2 flex gap-2  relative">
                <input
                  required
                  type={passCheck ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Password"
                  className=" border-x-2 border-y-2 border-gray-500 px-5 py-3  rounded-3xl outline-none "
                />
                {passCheck ? (
                  <button
                    onClick={passwordCheck}
                    className=" text-2xl py-3  absolute right-0 top-0 bottom-0 mr-7 mt-auto mb-auto text-green-500 transition-all ease-in-out duration-500"
                  >
                    <BsEyeFill />
                  </button>
                ) : (
                  <button
                    onClick={passwordCheck}
                    className=" text-2xl py-3  absolute right-0 top-0 bottom-0 mr-7 mt-auto mb-auto text-red-500 transition-all ease-in-out duration-500"
                  >
                    <BsFillEyeSlashFill />
                  </button>
                )}
              </div>
              
            </div>
            <button onClick={saveData} className="text-center bg-purple-700 w-1/2 rounded-3xl px-5 py-3 font-extrabold  text-white">Register</button>
            <h1 className="text-gray-400 flex items-center gap-1">
              Already have an Account?
              <Link to="/login" className="text-green-500">
                Login
              </Link>
            </h1>
          </div>
        </div>
        <img src={img} className="w-1/2 h-full rounded-tr-3xl rounded-br-3xl" />
      </div>
    </div>
    </motion.div>
  );
}

export default SignUp;
