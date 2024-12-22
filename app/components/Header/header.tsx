import React from 'react'
import Image from 'next/image';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
export default function Header() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-85 flex items-center gap-12 p-4 h-20 pr-10">
          <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg ml-12" />
          <h1 className="text-2xl font-bold">TaskMaster</h1>
          <div className="flex-grow flex justify-center gap-8 text-white">
            <a href="/" className="">< BorderAllIcon/></a>
            <a href="/" className=""><SplitscreenIcon/></a>
            <a href="/" className=""><LogoutRoundedIcon/></a>
          </div>
            <a href="/" className="">< PersonRoundedIcon/></a>

        </nav>
      );
}