import React from "react";
import { GrChat } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const Main = () => {
  const variants1 = {
    hidden: { opacity: 0, y: 50 }, // start slightly below
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // move to original position
  };
  const variants2 = {
    hidden: { opacity: 0, y: -50 }, // start slightly above
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // move to original position
  };
  const variants3 = {
    hidden: { opacity: 0, x: -50 }, // start slightly to the left
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }, // move to original position
  };
  const variants4 = {
    hidden: { opacity: 0, x: 50 }, // start slightly to the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  const variants5 = {
    hidden: { opacity: 0, y: 20 }, // start slightly below with opacity 0
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // move to original position with opacity 1
  };
  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center bg-white rounded-tr-3xl rounded-br-3xl">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="flex items-center gap-5 text-5xl phone:text-3xl">
        <motion.div initial="hidden" animate="visible" variants={variants3}><GrChat className="text-7xl text-green-500 phone:text-4xl" /></motion.div>
        <motion.div initial="hidden" animate="visible" variants={variants5}>ChatSphere</motion.div>
          <motion.div initial="hidden" animate="visible" variants={variants4}><TfiWorld className="text-7xl text-blue-700 phone:text-4xl" /></motion.div>
        </h1>
        <hr className="w-48" />
        <h1 className="flex gap-2 phone:text-xs">
          Where{" "}
          <motion.div initial="hidden" animate="visible" variants={variants1}>
            {" "}
            <span className="text-blue-700">Words</span>
          </motion.div>{" "}
          Create <motion.div initial="hidden" animate="visible" variants={variants2}><span className="text-green-500 ">World</span></motion.div>.
        </h1>
      </div>
      <Link
        to="/login"
        className="bg-green-500 py-5 w-48 text-center rounded-3xl text-white font-bold phone:text-sm phone:w-32 phone:py-3"
      >
        Explore
      </Link>
    </div>
  );
};
