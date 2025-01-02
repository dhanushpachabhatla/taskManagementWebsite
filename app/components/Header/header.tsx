"use client"
import { logout } from '../../firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { useRouter,usePathname } from 'next/navigation';
import DarkModeToggle from '../common/DarkModeToggle/DarkModeToggleButton';
export default function Header() {
    const[activePath, setActivePath] = useState("");
    const pathname = usePathname();
    const [isLogingOut, setIsLogingOut] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();//initialize router
    useEffect(() => {
      // Update the active path state based on the current route
      if (pathname === "/dashboard") {
        setActivePath("dashboard");
      } else if (pathname === "/assignedtask") {
        setActivePath("assignedtask");
      }
    }, [pathname]);
    
    const handlelogout = async () => {
      if(!isLogingOut){
        setIsLogingOut(true);
        try{
              await logout();
              localStorage.setItem("isLoggedIn", "false"); 
              router.push('/'); 
        }catch(error){
          setErrorMessage("Log out is failed, try again later");
          console.log("Log out is failed, try again later");
        }finally{
          setIsLogingOut(false);
        }
      }
    }
    return (
        <nav className="gap-3 sm:gap-6 md:gap-12 p-1 md:p-4 fixed top-0 left-0 w-full bg-slate-100 dark:bg-neutral-900  flex items-center  h-20 pr-10 border-b-2 dark:border-b-white z-50">
          <div className='flex items-center gap-1 md:gap-4'>
            
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg ml-4  md:ml-10 size-10 sm:size-14 md:size-16" />
          <h1 className=" text-lg sm:text-xl md:text-2xl font-bold dark:text-white text-neutral-700">TaskMaster</h1>
          </div>
          <div className="flex-grow flex justify-center  gap-4 md:gap-8 dark:text-white text-neutral-800">
            <Tooltip title={"My tasks"}>
            <a href="/dashboard" className="">< BorderAllIcon className={`${
            activePath === "dashboard" ? "text-blue-700" : "text-neutral-800 dark:text-neutral-200"
          }`} sx={{fontSize: { xs: '20px', sm: '25px', md: '30px', lg: '35px' } }}/></a>
            </Tooltip>
            <Tooltip title={"Assigned tasks"}>
            <a href="/assignedtask" className=""><SplitscreenIcon className={`${
            activePath === "assignedtask" ? "text-blue-700" : "text-neutral-800 dark:text-neutral-200"
          }`} sx={{fontSize: { xs: '20px', sm: '25px', md: '30px', lg: '35px' } }}/></a>
            </Tooltip>
            <Tooltip title={"Log Out"}>
            <div onClick={()=>{handlelogout()}} className='cursor-pointer '>
              <LogoutRoundedIcon className=' text-xs sm:text-sm lg:text-base' sx={{fontSize: { xs: '20px', sm: '25px', md: '30px', lg: '35px' } }} />
            </div>
            </Tooltip>
          </div>
            <Tooltip title={"Change Theme"}>
           <DarkModeToggle />
            </Tooltip>

        </nav>
      );
}