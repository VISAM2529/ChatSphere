import React, { useEffect, useState,useMemo } from "react";
import { GrChat } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { GoSignOut } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import SideBar from "./SideBar";
import { useSocket } from "../context/SocketProvider";
function Home() {
  const socket = useSocket()
  const [data, setData] = useState([]);
  const id = useParams();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("User Connected", socket.id);
    });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://chatsphere-zeyf.onrender.com/data/:${id.username}`
        );
        setData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex px-3 py-5 bg-purple-700 h-screen">
      <SideBar/>
      <div className="w-9/12 h-full flex flex-col gap-5 items-center justify-center bg-white rounded-tr-3xl rounded-br-3xl">
        <h1 className="flex items-center gap-5 text-5xl">
          <GrChat className="text-7xl text-green-500" />
          ChatSphere
          <TfiWorld className="text-7xl text-blue-700" />
        </h1>
        <hr className="w-48" />
        <h1>
          Where <span className="text-blue-700">Words</span> Create{" "}
          <span className="text-green-500 ">World</span>.
        </h1>
      </div>
    </div>
  );
}

export default Home;
