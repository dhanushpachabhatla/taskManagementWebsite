import React from 'react'
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
type Props = {}

const StatsRightSideBar = (props: Props) => {
  return (

    <div className='w-[22%] flex flex-col items-center gap-2 bg-slate-300  dark:bg-neutral-800 m-6 rounded-md border-[4px] border-transparent hover:border-blue-800 dark:hover:border-slate-300'>
        {/* tasks completed text */}
        <div className='text-3xl font-semibold text-slate-700 dark:text-slate-300 mt-9'>
            Tasks Compleleted
        </div>
        {/* body */}
        <div className='flex flex-col gap-10 items-center justify-center mt-5'>
            {/* circular chart */}
            <CircularStats/>
            {/* project Labels */}
            <TaskLabels/>

        </div>
        {/* footer */}
        <div>
            {/* projectlist */}
            <RightProjectList/>
        </div>
    </div>
  )
}

function CircularStats(){
    return(
        <div className='flex justify-center items-center'>
            <div className='w-40 h-40 bg-slate-500 dark:bg-slate-100 mt-4 rounded-full flex items-center justify-center'>
                <div className='w-[85%] flex justify-center items-center h-[86%]  rounded-full bg-slate-200 dark:bg-neutral-800'>
                    <span className='text-2xl font-semibold text-blue-800 dark:text-white'>90%</span>
                </div>
                
            </div>
        </div>
    )
}

function TaskLabels(){
    return(
        <div className='flex flex-col justify-center items-center gap-2'>
            <p className='font-bold text-xl text-neutral-600 dark:text-slate-300 '>3 Tasks Completed</p>
            <p className='text-neutral-600 dark:text-slate-300 '>20 Tasks done</p>
        </div>
    )
}

function RightProjectList(){
    return(
        <div className=' w-60 flex flex-col overflow-auto mt-16 gap-4'>
            <RightSingleProject/>
            <hr className='w-[80%] mx-auto text-slate-800 dark:text-slate-100 opacity-50' />
            <RightSingleProject/>
            <hr className='w-[80%] mx-auto text-slate-800 dark:text-slate-100 opacity-50' />
            <RightSingleProject/>
        </div>
    )
}

function RightSingleProject(){
    return(
        <div className='flex items-center gap-4'>
            <div className='w-8 h-9 bg-blue-800 rounded-md justify-center items-center flex text-white'>
            <SplitscreenIcon sx={{fontSize:"19px"}}/>
            </div>
            <ul>
                <li className='text-[16px] font-semibold text-slate-600 dark:text-slate-300'>Task 1</li>
                <li className='text-[13px] text-slate-400'>3 SubTasks</li>
            </ul>
        </div>
    )
}
export default StatsRightSideBar