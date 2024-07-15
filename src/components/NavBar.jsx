import React, { useState, useEffect, useRef } from 'react';
import SideBar from './SideBar';
import { AnimatePresence, motion } from "framer-motion"
import { useChatConext } from './ChatContext';

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {setChatId} = useChatConext()

  const sidebarRef = useRef(null);

  const handleSvgClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative flex flex-grow p-4 dark:bg-[#252D39] ">
      <div className="flex gap-8 text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={handleSvgClick}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <h1 className=' font-semibold hover:cursor-pointer' onClick={()=>setChatId(0)}>Telegram</h1>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 ml-auto text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <AnimatePresence>

      {isSidebarOpen && (
        <motion.div className="fixed inset-0 z-40" variants={{hidden:{opacity:0,x:-40}, visible:{opacity:1,x:0},exit: { opacity: 0, x: -40 } }} initial="hidden"   animate={isSidebarOpen ? "visible" : "hidden"}  
        exit="exit">
          <div
            ref={sidebarRef}
            className="absolute left-0 top-0 h-full w-[80%] bg-white shadow-lg z-50 dark:bg-[#17202A] min-h-screen sm:max-w-[520px] sm1:w-[220px] md:w-[325px] "
          
          >
         
            <SideBar/>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </motion.div>
      )}
          </AnimatePresence>

    </div>
  );
};

export default NavBar;
