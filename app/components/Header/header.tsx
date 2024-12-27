"use client"
import { logout } from '../../firebase/auth';
import React from 'react'
import Image from 'next/image';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from '../common/DarkModeToggle/DarkModeToggleButton';
export default function Header() {
    const [isLogingOut, setIsLogingOut] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();//initialize router
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
        <nav className="fixed top-0 left-0 w-full bg-slate-100 dark:bg-neutral-900  flex items-center gap-12 p-4 h-20 pr-10 border-b-2 dark:border-b-white z-50">
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg ml-12" />
          <h1 className="text-2xl font-bold dark:text-white text-neutral-700">TaskMaster</h1>
          <div className="flex-grow flex justify-center gap-8 dark:text-white text-neutral-800">
            <Tooltip title={"My tasks"}>
            <a href="/dashboard" className="">< BorderAllIcon/></a>
            </Tooltip>
            <Tooltip title={"Assigned tasks"}>
            <a href="/assignedtask" className=""><SplitscreenIcon/></a>
            </Tooltip>
            <Tooltip title={"Log Out"}>
            <div onClick={()=>{handlelogout()}} className='cursor-pointer '>
              <LogoutRoundedIcon />
            </div>
            </Tooltip>
          </div>
            <Tooltip title={"Profile"}>
            <a href="/" className="ml-40 mr-12 ">< PersonRoundedIcon className='bg-neutral-800 rounded-md'/></a>
            </Tooltip>
            <Tooltip title={"Change Theme"}>
           <DarkModeToggle/>
            </Tooltip>

        </nav>
      );
}