import React, { useEffect, useRef, useState,useMemo, } from "react";
import { FiSearch } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";
import { Link ,useParams} from "react-router-dom";
import SideBar from "./SideBar";
import {MdDarkMode} from "react-icons/md"
import {FaLightbulb} from "react-icons/fa"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
function Chat() {
  const date = new Date()
  const socket = useSocket()
  const id = useParams()
  const msgRef = useRef("");
  const [messages,setMessages]=useState([{type:"",content:""}])
  const [showMoreModal,setShowMoreModal]=useState(false)
  const [friendData,setFriendData] = useState([])
  const navigate = useNavigate()
  const [background,setBackground] = useState(false)
useEffect(() => {
    const fetchaData1 = async () => {
        try {
            socket.on("setUsername",(id.username,id.friend))
            socket.on("incoming:call",({from,offer})=>{
                console.log(`Incoming Call`,from,offer)
            })
            socket.off("incoming:call")
            const response = await axios.get(`https://chatsphere-xozz.onrender.com/chatInfo/${id.username}/${id.friend}`);
            if (response.data.length > 0) {
                setMessages(response.data[0].chatDetails);
            } else {
                setMessages({
                    type: "",
                    content: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchaData2 = async () => {
        try {
            const response = await axios.get(`https://chatsphere-xozz.onrender.com/FriendData/${id.username}/${id.friend}`);
            if (response.data.length > 0) {
                setFriendData(response.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };


  fetchaData1()
    fetchaData2();

    const handleReceivedMessage = async (msg) => {
        try {
            const res = await axios.post("https://chatsphere-xozz.onrender.com/chat", {
                from: id.username,
                to: id.friend,
                chatDetails: { msgtype: "othermsg", content: msg ,date:date.getDate(),
                hours:date.getHours(),
                minutes:date.getMinutes(),
                month:date.getMonth(),
                year:date.getFullYear()},
                
            });
        } catch (error) {
            console.log(error);
        }
    };

    socket.on("rmsg", handleReceivedMessage);

    return () => {
        socket.off("rmsg", handleReceivedMessage);
    };
}, [id.username, id.friend, messages]);
 // Empty dependency array ensures this effect runs only once, similar to componentDidMount


  const sendMessage = async(msg) => {

    socket.emit("message", msg);
    // setMessages((prev) => [...prev, {type:"yourmsg",content:msg}]);
    try {
      const res = await axios.post("https://chatsphere-xozz.onrender.com/chat", {
        from: id.username,
        to: id.friend,
        chatDetails: {msgtype:"yourmsg",content:msg,date:date.getDate(),
        hours:date.getHours(),
        minutes:date.getMinutes(),
        month:date.getMonth(),
        year:date.getFullYear() }
      })
    } catch (error) {
      console.log(error);
    }
    msgRef.current.value=""
  };
  const handleSendMessageKeyPress = async(e,msg) => {

    if(e.key==="Enter"){
      socket.emit("message", msg);
    // setMessages((prev) => [...prev, {type:"yourmsg",content:msg}]);
    try {
      const res = await axios.post("https://chatsphere-xozz.onrender.com/chat", {
        from: id.username,
        to: id.friend,
        chatDetails: {msgtype:"yourmsg",content:msg,date:date.getDate(),
        hours:date.getHours(),
        minutes:date.getMinutes(),
        month:date.getMonth(),
        year:date.getFullYear() }
      })
    } catch (error) {
      console.log(error);
    }
    msgRef.current.value=""
    }
    
  };

  const handleModeClick = ()=>{
    setBackground(!background)
  }
  return (
    <div className="flex px-3 py-5 bg-purple-700 w-full h-screen">
      {/* SIDEBAR */}
     
      <SideBar />

      {/* CHAT */}
      <div className={background ? "flex flex-col justify-between gap-5 px-5 py-5  bg-gray-900 w-9/12 h-full rounded-tr-3xl rounded-br-3xl ease-in-out transition-all duration-700":"flex flex-col justify-between gap-5 px-5 py-5  bg-white w-9/12 h-full rounded-tr-3xl rounded-br-3xl ease-in-out transition-all duration-700"}>
        <div className="flex it flex-col gap-3">
          <div className="flex items-center justify-between ">
            <Link to={"/friendDetail"} className="flex items-center gap-5">
              <img
                src={friendData.FriendDp ? require(`../uploads/${friendData.FriendDp}`) : null}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className={background ? "flex flex-col items-start gap-2 text-white ease-in-out transition-all duration-700" : "flex flex-col items-start gap-2 text-black ease-in-out transition-all duration-700"}>
                <h1 className="text-xl">{id.friend}</h1>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-5">
              
              <button onClick={handleModeClick} className={background ? "text-white font-extrabold text-2xl ease-in-out transition-all duration-700":"text-2xl ease-in-out transition-all duration-700"}>
              {background ? <FaLightbulb /> : <MdDarkMode />}
              </button>
            </div>
          </div>
          <hr className="w-full" />
        </div>
        <div className="h-full flex flex-col-reverse overflow-y-auto">
        <div className=" h-full flex flex-col-reverse  gap-5 overflow-y-auto  scrollbar scrollbar-thumb-transparent scrollbar-track-transparent">
          
          {messages.length>0 ?  messages.slice().reverse().map((msg) => {
              if(msg.msgtype==="yourmsg"){
                return <div className="flex flex-col gap-1 items-end px-3">
                  <p className="text-xs text-gray-200">{`${msg.date}/${msg.month}/${msg.year}`}</p>
                <h1 className="bg-white w-fit  px-3 text-center h-10 flex items-center justify-center rounded-lg shadow-inner border-x-2 border-y-2 border-green-200 text-green-500 font-bold">{msg.content}</h1>  
                <p className="text-xs text-gray-200">{`${msg.hours}:${msg.minutes}`} {msg.hours >=12 ? "pm" : "am"}</p>
                </div>
              }
              else if(msg.msgtype==="othermsg"){
                return <div className="flex flex-col gap-1 items-start px-3">
                  <p className="text-xs text-gray-200">{`${msg.date}/${msg.month}/${msg.year}`}</p>
                <h1 className="bg-white w-fit  px-3 text-center h-10 flex items-center justify-center rounded-lg shadow-inner border-x-2 border-y-2 border-red-200 text-red-500 font-bold">{msg.content}</h1>
                <p className="text-xs text-gray-200">{`${msg.hours}:${msg.minutes}`} {msg.hours>=12 ? "pm" :"am"}</p>
                </div>
              }
          }) : <h1 className="flex flex-col items-center ">No Messages for You</h1>}
        
      </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 w-11/12">
            <input
              ref={msgRef}
              placeholder="Type Message...."
              className="bg-gray-100 px-10 py-3 rounded-3xl w-full outline-none"
              onKeyDown={(e)=>handleSendMessageKeyPress(e,msgRef.current.value)}
            />
          </div>
          <button className=" px-3 py-3 rounded-full bg-green-500 text-white" onClick ={()=>sendMessage(msgRef.current.value)} >
            <BsSendFill className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
