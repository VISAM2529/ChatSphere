import React, { useEffect, useRef, useState } from "react";
import { GoSignOut } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import SideBar from "./SideBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Lottie from "lottie-react"
import animationData from "../assetes/noData.json"
function AddFriend() {
  const id = useParams();
  const [invite, setInvite] = useState(false);
  const inputRef = useRef("");
  const [userData, setUserData] = useState([]);
  const [friendData,setFriendData]=useState([])
  const [filterUserData, setFilterUserData] = useState([]);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get("https://chatsphere-zeyf.onrender.com/userData");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData1();
    const fetchData2 = async () => {
      try {
        const response = await axios.get(`https://chatsphere-zeyf.onrender.com/FriendData/${id.username}`);
        setFriendData((response.data).map((item)=>{
          return item.FriendUsername
        }))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  }, [userData,friendData]);
  const saveData = async (fname, lname, username, mobileno, dp) => {
    try {
      await axios
        .post("https://chatsphere-zeyf.onrender.com/addFriend", {
          you: id.username,
          fname: fname,
          lname: lname,
          username: username,
          mobileno: mobileno,
          dp: dp,
        })
        .then((res) => {
          if (res.data === "Added") {
            toast.success("Added!");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            toast.error("Something Went Wrong!");
          }
        });
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="flex px-3 py-5 bg-purple-700 h-screen phone:px-0 phone:py-0">
      <Toaster />
      {/* SIDEBAR */}
      <SideBar className="phone:hidden"/>
      

      {/* ADD FRIEND */}
      <div className="flex flex-col gap-10 px-5 py-5  bg-white w-9/12 h-full rounded-tr-3xl rounded-br-3xl phone:w-full phone:rounded-none">
        <div className="flex flex-col items-start gap-5 phone:gap-3">
          <h1 className="text-3xl phone:text-lg">Add Friend</h1>
          <hr className="w-48" />
        </div>
        <div className="flex items-center gap-5">
          <input
            onChange={() => {
              setFilterUserData(
                userData.filter(
                  (item) => item.username === inputRef.current.value
                )
              );
            }}
            ref={inputRef}
            placeholder="Search Friend "
            className="w-full border-x-2 border-y-2 rounded-3xl px-3 py-3 outline-none phone:text-xs"
          />
          <button className="text-3xl font-extrabold ">
            <CiSearch />
          </button>
        </div>
        <div className="flex flex-col gap-5 ">
          {filterUserData.length>0? filterUserData.map((item) => {
            return (
              <div className="flex items-center justify-between px-10 phone:px-0">
                <img
                  src={`https://res.cloudinary.com/dqfum2awz/image/upload/v1713273488/Users/${item.profilePhoto}`}
                  className="w-16 h-16 rounded-full object-cover phone:w-8 phone:h-8"
                />
                <h1 className="text-xl phone:text-sm">{item.username}</h1>
                {item.username === id.username || friendData.includes(item.username)? (
                  <button className="bg-gray-400 px-10 py-3 rounded-xl text-gray-200 phone:text-xs phone:px-2">
                    Already Friend
                  </button>
                ) : (
                  <button
                    className="bg-purple-700 px-10 py-3 rounded-xl text-white phone:text-xs phone:px-2"
                    onClick={() =>
                      saveData(
                        item.firstName,
                        item.lastName,
                        item.username,
                        item.mobileno,
                        item.profilePhoto
                      )
                    }
                  >
                    Add Friend
                  </button>
                )}
              </div>
            );
          }): <div className="flex items-center justify-center">
              <Lottie animationData={animationData} className="max-w-sm "/>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
