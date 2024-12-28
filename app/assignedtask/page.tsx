"use client"
import { useState } from 'react'
import React from 'react'
import SearchBar from '../components/common/SeachBar/SearchBar'
import StatsRightSideBar from '../components/common/StatsRightSideBar/StatsRightSideBar'
import SortByButton from '../components/common/SortByButton/SortByButton'
import AssignedTaskCard from '../components/assigned/AssignedTaskCard'
import AssignTaskButton from '../components/assigned/AssignTask'

type Task = {
  id: number;
  title: string;
  created: string;
  dueDate: string;
  priority:string;
  subtasks: string[];
  assignedBy : string;
  assignedTo : string;
  progress: number;
};

const initialTasks: Task[] = [
  {
      id: 1,
      title: 'Build a Landing Page',
      created: '2 days ago',
      dueDate: '2024-12-31',
      priority:'high',
      subtasks: ['Create wireframe', 'Implement design', 'Write content'],
      assignedBy : 'Website Team',
      assignedTo : 'Dhanush',
      progress: 80,
  },
  {
      id: 2,
      title: 'API Integration',
      created: '5 days ago',
      dueDate: '2025-01-21',
      priority:'low',
      subtasks: ['Set up endpoints', 'Test functionality', 'Deploy to staging'],
      assignedBy : 'Dhanush',
      assignedTo : 'Harsha',
      progress: 40,
  },
  {
      id: 3,
      title: 'Write Documentation',
      created: '1 week ago',
      dueDate: '2025-04-28',
      priority:'med',
      subtasks: ['Outline topics', 'Draft content', 'Review and edit'],
      assignedBy : 'Harsha',
      assignedTo : 'Dhanush',
      progress: 0,
  },
  {
      id: 4,
      title: 'Read Book',
      created: '2 week ago',
      dueDate: '2024-12-29',
      priority:'high',
      subtasks: ['Outline topics', 'Draft content', 'underline'],
      assignedBy : 'Harshad Mehtha',
      assignedTo : 'Harsha Mehra',
      progress: 100,
  },
];

function AssignedTaskPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const handleAddTask = (newTask: Task) => {
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    };
    
    const filteredTasks = tasks.filter((task) => {
      if (!category) return true;
      if (category === 'ToDo') return task.progress === 0;
      if (category === 'On Progress') return task.progress > 0 && task.progress < 100;
      if (category === 'Done') return task.progress === 100;
      return true;
  });
    
  const priorityFilteredTasks = filteredTasks.filter((task) => {
      if (sortBy === 'P-High') return task.priority === 'high';
      if (sortBy === 'P-Med') return task.priority === 'med';
      if (sortBy === 'P-Low') return task.priority === 'low';
      return true;
  });
  
  // Apply sorting
  const sortedTasks = priorityFilteredTasks.sort((a, b) => {
      if (sortBy === 'Recent') {
          return new Date(b.created).getTime() - new Date(a.created).getTime(); // Most recently created first
      }
      if (sortBy === 'Due-Date') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); // Closest due date first
      }
      return 0; 
  });
    
    
  return (
    <div style={{ marginTop: "80px" }} className=' bg-slate-100 dark:bg-neutral-950 w-full min-h-screen flex'>
      <div className='w-[78%] flex flex-col gap-4 p-10 border-r-2 dark:border-r-0'>
        <div className='flex justify-between'>
          <SearchBar />
          <AssignTaskButton  onAddTask={handleAddTask}/>
        </div>
        <div className='mt-16 flex justify-between font-bold items-center'>
        <p className='text-[26px] font-bold text-neutral-700 dark:text-slate-200'>My Assigned Tasks</p>
        <SortByButton onCategoryChange={setCategory} onSortByChange={setSortBy}/>
    </div>
        <div className='overflow-auto flex gap-10 flex-wrap justify-center mt-7'>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) =><AssignedTaskCard  key={task.id} task={task}/>)
        ) : (
          <p className="text-neutral-500 dark:text-neutral-300 text-6xl font-bold mt-36">
            No Tasks Made !
          </p>
        )}
        
        </div>
      </div>
      <StatsRightSideBar task={sortedTasks} />
    </div>
  )
}

export default AssignedTaskPage
