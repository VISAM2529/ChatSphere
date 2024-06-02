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
        <div className="w-1/2 flex flex-col items-center gap-24 justify-center phone:w-full">
          <div className="w-1/2 flex flex-col items-center gap-3 py-5 text-center phone:w-full">
            <h1 className="flex items-center gap-5 text-5xl phone:text-2xl">
              <GrChat className="text-7xl text-green-500 phone:text-4xl" />
              ChatSphere
              <TfiWorld className="text-7xl text-blue-700 phone:text-4xl" />
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
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:text-xs"
              />
              <input
                required
                ref={lnameRef}
                type="text"
                placeholder="Last Name"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:text-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-5 justify-center w-full">
              <div className="flex items-center gap-5">
              <input
                required
                ref={emailRef}
                type="email"
                placeholder="Email ID"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:text-xs "
              />
              <input
                required
                ref={mobileRef}
                type="number"
                placeholder="Mobile No"
                className="border-x-2 border-y-2 border-gray-500 px-5 py-3 w-1/2 rounded-3xl outline-none phone:text-xs"
              />
              </div>
              <div className="flex items-center gap-3">
              <input onChange={(e)=>{
                setImage(e.target.files[0])
              }} ref={imgRef} id="profilePhoto" type="file" name="profilePhoto" className="hidden"/>
              <label for="profilePhoto" className="bg-gray-400 px-3 py-3 rounded-xl text-sm text-white">Upload ProfilePhoto</label> <h1>{image ? image.name : null}</h1>            </div>
            </div>
            <div className="flex  items-center gap-5 phone:flex-col">
              <div className="w-1/2 flex gap-2  relative phone:w-full">
                <input
                  required
                  ref={usernameRef}
                  onChange={() => {
                    const check = userData.find((user) => user === usernameRef.current.value );

                    check ? setUserNameCheck(false) : setUserNameCheck(true)
                  }}
                  placeholder="Username"
                  className="border-x-2 border-y-2 pr-10 border-gray-500 px-5 py-3 w-full rounded-3xl outline-none phone:text-xs"
                />
                {userNameCheck ? (
                  <button
                    className=" text-3xl py-3  absolute right-0 top-0 bottom-0 mr-5 mt-auto mb-auto text-green-500 transition-all ease-in-out duration-500"
                  >
                    <MdDownloadDone />
                  </button>
                ) : (
                  <button
                    className=" text-3xl py-3  absolute right-0 top-0 bottom-0 mr-5 mt-auto mb-auto text-red-500 transition-all ease-in-out duration-500 phone:text-xl"
                  >
                    <RxCross2 />
                  </button>
                )}
              </div>
              <div className="w-1/2 flex gap-2  relative phone:w-full">
                <input
                  required
                  type={passCheck ? "text" : "password"}
                  ref={passwordRef}
                  placeholder="Password"
                  className=" border-x-2 border-y-2 border-gray-500 px-5 py-3 w-full rounded-3xl outline-none phone:text-xs"
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
                    className=" text-2xl py-3  absolute right-0 top-0 bottom-0 mr-7 mt-auto mb-auto text-red-500 transition-all ease-in-out duration-500 phone:text-xl"
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
        <img src={img} className="w-1/2 h-full rounded-tr-3xl rounded-br-3xl phone:hidden" />
      </div>
    </div>
    </motion.div>
  );
}

export default SignUp;
