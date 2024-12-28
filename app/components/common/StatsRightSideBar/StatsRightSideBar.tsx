import React from 'react';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { Task as TaskIcon } from '@mui/icons-material';

type TaskType = {
  id: number;
  title: string;
  created: string;
  dueDate: string;
  priority: string;
  subtasks: string[];
  progress: number;
};

type Props = {
  task: TaskType[];
};

const StatsRightSideBar = ({ task }: Props) => {
  // Calculate total and completed tasks based on progress
  const total = task.length;  // Total tasks
  const completed = task.filter(t => t.progress === 100).length;  // Tasks with progress 100

  return (
    <div className='w-[22%] flex flex-col items-center gap-2 bg-slate-300  dark:bg-neutral-800 m-6 rounded-md border-[4px] border-transparent hover:border-blue-800 dark:hover:border-slate-300'>
      {/* tasks completed text */}
      <div className='text-3xl font-semibold text-blue-600 mt-9'>
        Tasks Completed
      </div>
      {/* body */}
      <div className='flex flex-col gap-10 items-center justify-center mt-5'>
        {/* circular chart */}
        <CircularStats completed={completed} total={total} />
        {/* project Labels */}
        <TaskLabels completed={completed} total={total} />
      </div>
      {/* footer */}
      <div>
        {/* projectlist */}
        <RightProjectList tasks={task} />
      </div>
    </div>
  );
};

function CircularStats({ completed, total }: { completed: number; total: number }) {
    const percentage = total ? (completed / total) * 100 : 0;
    
    const radius = 50; // Radius of the circle
    const strokeWidth = 10; // Stroke width of the ring
    const circumference = 2 * Math.PI * radius;
    
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="flex justify-center items-center">
        <div className="relative w-40 h-40 rounded-full bg-slate-200 dark:bg-neutral-800">
          {/* Outer Circle - Progress Ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#3b82f6 ${percentage}%, #e0e0e0 ${percentage}% 100%)`,
              clipPath: 'circle(50% at 50% 50%)',
            }}
          />
          
          {/* Inner Circle */}
          <div
            className="absolute inset-0 rounded-full bg-white dark:bg-neutral-900"
            style={{
              clipPath: 'circle(45% at 50% 50%)', // Creates the ring effect
            }}
          />
          
          {/* Text in the center */}
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-2xl font-semibold text-blue-800 dark:text-white">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  
function TaskLabels({ completed, total }: { completed: number; total: number }) {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <p className='font-bold text-xl text-neutral-600 dark:text-slate-300 '>{completed} Completed</p>
      <p className='text-neutral-600 dark:text-slate-300 '>{total} Total</p>
    </div>
  );
}

function RightProjectList({ tasks }: { tasks: TaskType[] }) {
  return (
    <div className='w-60 flex flex-col overflow-auto mt-16 gap-4'>
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <RightSingleProject recentTask={task.title} created={task.created} />
          <hr className='w-[80%] mx-auto text-slate-800 dark:text-slate-100 opacity-50' />
        </React.Fragment>
      ))}
    </div>
  );
}

function RightSingleProject({ recentTask, created }: { recentTask: string; created: string }) {
  return (
    <div className='flex items-center gap-4'>
      <div className='w-8 h-9 bg-blue-800 rounded-md justify-center items-center flex text-white'>
        <SplitscreenIcon sx={{ fontSize: '19px' }} />
      </div>
      <ul>
        <li className='text-[16px] font-semibold text-slate-600 dark:text-slate-300'>{recentTask}</li>
        <li className='text-[13px] text-slate-400'>{created}</li>
      </ul>
    </div>
  );
}

export default StatsRightSideBar;

