import React, { useEffect, useState, } from "react";
import { GoSignOut } from "react-icons/go";
import { Link, useParams, useNavigate} from "react-router-dom";
import {IoPersonAddSharp} from "react-icons/io5"
import axios from "axios";
function SideBar({className}) {
  const id = useParams();
  const USER = id.username
  const [data, setData] = useState([]);
  const [friendData,setFriendData]=useState([])
  const navigate= useNavigate()
  const [img,setImg]=useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( 
          `https://chatsphere-zeyf.onrender.com/data/:${USER}`
        );
        if(response){
          setData(response.data[0]);
          setImg(response.data[0].profilePhoto)
          console.log(img)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `https://chatsphere-zeyf.onrender.com/FriendData/:${USER}`
        );
        setFriendData(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData1()
  }, []);
  const handleChatClick=(user,friend)=>{
    navigate(`/chat/${user}/${friend}`)
  }

  return (
    <div className={` flex flex-col py-3 items-center justify-between  bg-white backdrop-blur-3xl bg-opacity-15 w-3/12 h-full rounded-tl-3xl rounded-bl-3xl  phone:w-full phone:rounded-none phone:py-0 phone:bg-white ${className}`}>
      <div className="flex flex-col items-center gap-5 w-full h-full phone:items-start  phone:gap-2 ">
        <div className="flex flex-col px-3 phone:px-3  gap-5 py-0 phone:py-5 phone:bg-purple-700 w-full phone:shadow-md phone:shadow-gray-500 phone:sticky phone:top-0">
          <div className="flex items-center gap-3 phone:w-full">
          <img
              src={data.profilePhoto ? `https://res.cloudinary.com/dqfum2awz/image/upload/v1713273488/Users/${data.profilePhoto}`:null}
              className="w-20 h-20 rounded-full object-cover phone:w-10 phone:h-10"
          />
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-lg text-white phone:text-sm">
              {data.firstName} {data.lastName}
            </h1>
            <Link to="/login" className="text-sm text-gray-300 phone:text-xs">LogOut</Link>
          </div>
          </div>
          <div className="flex items-center gap-3 justify-between px-2 phone:w-full">
            <h1 className="text-gray-300 flex items-center justify-between phone:text-sm">YOUR FRIENDS </h1>
            <hr className="w-24 phone:w-32" />
            <Link className="text-2xl text-white phone:text-lg" to={`/addFriend/${data.username}`}><IoPersonAddSharp/></Link>
          </div>
        </div>
        <div className="flex flex-col w-full  items-center  gap-7 h-3/4 py-5 phone:h-fit phone:px-0 phone:mb-5">
          
          <div to="/chat" className="flex flex-col items-center w-full h-full phone:bg-white phone:py-0">
            <div className=" flex flex-col items-center gap-8 w-full px-5 h-full  phone:gap-2 overflow-y-auto scrollbar scrollbar-thumb-transparent  phone:overflow-y-auto phone:scrollbar phone:scrollbar-thumb-transparent">
            {
              friendData.map((friend)=>{
                return <div className="w-full flex flex-col items-center phone:gap-3  bg-white bg-opacity-20 py-2 rounded-xl hover:bg-opacity-10 ease-in-out transition-all duration-300">
                  <button onClick={()=>handleChatClick(USER,friend.FriendUsername)} className="flex items-center  w-full  px-10 gap-5 phone:px-0">
                  <img src={friend.FriendDp ? `https://res.cloudinary.com/dqfum2awz/image/upload/v1713273488/Users/${friend.FriendDp}`:null} className="w-12 h-12 rounded-full object-cover phone:w-8 phone:h-8"/>
                  <h1 className="text-white font-bold phone:text-black phone:font-normal">{friend.FriendUsername}</h1>
                </button>
                <hr className="phone:w-full"/>
                </div>
              })
            }
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
