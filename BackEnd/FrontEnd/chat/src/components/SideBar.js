import React, { useEffect, useState, } from "react";
import { GoSignOut } from "react-icons/go";
import { Link, useParams, useNavigate} from "react-router-dom";
import {IoPersonAddSharp} from "react-icons/io5"
import axios from "axios";
function SideBar() {
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
          `https://chatsphere-uhuh.onrender.com/data/:${USER}`
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
          `https://chatsphere-uhuh.onrender.com/FriendData/:${USER}`
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
    <div className=" flex flex-col py-3 items-center justify-between  bg-white backdrop-blur-3xl bg-opacity-15 w-3/12 h-full rounded-tl-3xl rounded-bl-3xl">
      <div className="flex flex-col items-center gap-10 w-full h-full ">
        <div className="flex items-center gap-3">
          <img
              src={data.profilePhoto ? `https://github.com/VISAM2529/ChatSphere/tree/main/BackEnd/FrontEnd/chat/src/uploads/${data.profilePhoto}`:null}
              className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-lg text-white">
              {data.firstName} {data.lastName}
            </h1>
            <Link to="/login" className="text-sm text-gray-300">LogOut</Link>
          </div>
        </div>
        <div className="flex flex-col w-full  items-center  gap-7 h-3/4 py-5">
          <div className="flex items-center gap-3">
            <h1 className="text-gray-300 flex items-center justify-between">YOUR FRIENDS </h1>
            <hr className="w-24 " />
            <Link className="text-xl text-white" to={`/addFriend/${data.username}`}><IoPersonAddSharp/></Link>
          </div>
          <div to="/chat" className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col items-center gap-8 w-full px-5 h-full   overflow-y-auto scrollbar scrollbar-thumb-transparent  ">
            {
              friendData.map((friend)=>{
                return <div className="w-full flex items-center bg-white bg-opacity-20 py-2 rounded-xl hover:bg-opacity-10 ease-in-out transition-all duration-300">
                  <button onClick={()=>handleChatClick(USER,friend.FriendUsername)} className="flex items-center w-full  px-10 gap-5">
                  <img src={friend.FriendDp ? `https://github.com/VISAM2529/ChatSphere/tree/main/BackEnd/FrontEnd/chat/src/uploads/${friend.FriendDp}`:null} className="w-12 h-12 rounded-full object-cover"/>
                  <h1 className="text-white font-bold">{friend.FriendUsername}</h1>
                </button>
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
