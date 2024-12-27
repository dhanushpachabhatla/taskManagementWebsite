import React from 'react'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
type Props = {}

const AssignedTaskCard = (props: Props) => {
  return (
    <div className='size-80   rounded-lg gap-3  flex flex-col justify-between bg-slate-300 dark:bg-zinc-800 p-3 border-[4px] border-transparent hover:border-blue-800 dark:hover:border-slate-300'>
        {/* Project icon and title */}
        <div className='flex gap-4 justify-around '>
            {/* icon */}
            <div className='items-center flex'>
                <SplitscreenIcon  sx={{fontSize:"30px"}} className='text-slate-100 bg-blue-800 rounded-md p-1 m-1 '/>
            </div>
            {/* title */}
            <div className='flex flex-col mr-10'>
                <span className='text-2xl font-semibold text-blue-800 dark:text-slate-100'> Task title</span>
                <span className=' text-sm font-semibold text-slate-600 dark:text-slate-100'>3 days ago</span>
            </div>
            {/* more icon */}
            <div className='items-center flex'>
                <MoreVertIcon sx={{fontSize:"30px"}} className='text-slate-800 dark:text-slate-100'/>
            </div>
        </div>
        
        {/* sub tasks */}
        <ul>
            <li  className='flex gap-2 items-center' >
                <CircleIcon sx={{fontSize:"9px"}} className='text-slate-700 dark:text-slate-400'/>  
                <span className='text-slate-600 dark:text-slate-100'>Lorem ipsum dolor sit amet.</span>
            </li>
            <li className='flex gap-2 items-center' >
                <CircleIcon sx={{fontSize:"9px"}} className='text-slate-700 dark:text-slate-400'/>  
                <span className='text-slate-600 dark:text-slate-100'>Lorem ipsum dolor sit amet.</span>
            </li>
            <li className='flex gap-2 items-center' >
                <CircleIcon sx={{fontSize:"9px"}} className='text-slate-700 dark:text-slate-400'/>  
                <span className='text-slate-600 dark:text-slate-100'>Lorem ipsum dolor sit amet.</span>
            </li>
        </ul>
        <div className='flex flex-col text-xs'>
            <span className='font-mono text-yellow-600 font-bold'>
            Assigned from :
            <span className='text-slate-700 dark:text-slate-200' >
                KVJ Harsha
                </span> 
            </span>
            <span className='font-mono text-yellow-600 font-bold'>
            Assigned To :
            <span className='text-slate-700 dark:text-slate-200'>
                P. Dhanush
                </span> 
            </span>
        </div>
        {/* footer */}
        <div className='flex gap-4 flex-col mt-2'>
        <div className='font-semibold text-blue-800 dark:text-slate-400 mt-1 text-sm'>
            Due Date : 5th Dec
        </div>
            <div className='w-full flex items-center gap-3 text-[12px]'>
                <div className='w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden'>
                    <div className='w-1/2 bg-blue-800 h-full rounded-xl'></div>
                </div>
            </div>
        <div className='flex justify-between'>
            <p className='text-[13px] text-slate-500'>On progress</p>
            <div className='flexgap-1 text-[13px]'>
                {/* list icon */}
            </div>
            <p className='text-blue-600 dark:text-slate-100'>50%</p>
        </div>
        </div>
    </div>
  )
}

export default AssignedTaskCard