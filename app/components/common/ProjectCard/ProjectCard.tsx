import React from 'react';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';

type Task = {
    id: number;
    title: string;
    created: string;
    dueDate: string;
    priority:string;
    subtasks: string[];
    progress: number;
};

type Props = {
    task: Task;
};

const ProjectCard = ({ task }: Props) => {
    return (
        <div className="size-80 rounded-lg gap-3 flex flex-col justify-between bg-slate-300 dark:bg-zinc-800 p-3 border-[4px] border-transparent hover:border-blue-800 dark:hover:border-slate-300">
            {/* Project icon and title */}
            <div className="flex gap-4 justify-around">
                {/* icon */}
                <div className="items-center flex">
                    <SplitscreenIcon
                        sx={{ fontSize: '30px' }}
                        className="text-slate-100 bg-blue-800 rounded-md p-1 m-1"
                    />
                </div>
                {/* title */}
                <div className="flex flex-col mr-10">
                    <span className="text-xl font-semibold text-blue-800 dark:text-slate-100">
                        {task.title}
                    </span>
                    <span className='mt-1 flex gap-5'>
                    <span className="  text-sm font-semibold text-slate-600 dark:text-slate-100">
                        {task.created}
                    </span>
                    {
                        task.priority === 'high'? (<span className=" h-5 font-semibold bg-red-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs ">
                            {task.priority}
                        </span>) : task.priority === 'med'? (<span className=" h-5 font-semibold bg-orange-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs ">
                            {task.priority}
                        </span>) : (<span className=" h-5 font-semibold bg-green-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs ">
                        {task.priority}
                    </span>)
                    } 
                    
                    </span>
                </div>
                {/* more icon */}
                <div className="items-center flex">
                    <MoreVertIcon sx={{ fontSize: '30px' }} className="text-slate-800 dark:text-slate-100" />
                </div>
            </div>

            {/* sub tasks */}
            <ul>
                {task.subtasks.map((subtask, index) => (
                    <li key={index} className="flex gap-2 items-center">
                        <CircleIcon sx={{ fontSize: '9px' }} className="text-slate-700 dark:text-slate-400" />
                        <span className="text-slate-600 dark:text-slate-100">{subtask}</span>
                    </li>
                ))}
            </ul>

            {/* footer */}
            <div className="flex gap-4 flex-col mt-2">
                <div className="font-semibold text-blue-800 dark:text-slate-400 mt-1 text-sm">
                    Due Date : {task.dueDate}
                </div>
                <div className="w-full flex items-center gap-3 text-[12px]">
                    <div className="w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden">
                        <div
                            className="bg-blue-800 h-full rounded-xl"
                            style={{ width: `${task.progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-[13px] text-slate-500">On progress</p>
                    <div className="flex gap-1 text-[13px]"></div>
                    <p className="text-blue-600 dark:text-slate-100">{task.progress}%</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
