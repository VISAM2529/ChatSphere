import React from 'react'
import { GrChat } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { Link } from 'react-router-dom';
export const Main = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center bg-white rounded-tr-3xl rounded-br-3xl">
        <div className='flex flex-col gap-5 items-center'>
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
        <Link to="/login" className='bg-green-500 py-5 w-48 text-center rounded-3xl text-white font-bold'>Explore</Link>
      </div>
  )
}
