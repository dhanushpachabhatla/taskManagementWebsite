"use client"
import { useState } from 'react'
import React from 'react'
import SearchBar from '../components/common/SeachBar/SearchBar'
import StatsRightSideBar from '../components/common/StatsRightSideBar/StatsRightSideBar'
import SortByButton from '../components/common/SortByButton/SortByButton'
import AssignedTaskCard from '../components/assigned/AssignedTaskCard'
import AssignTaskButton from '../components/assigned/AssignTask'
import { useEffect } from 'react'
type Task = {
  username:string;
  _id:string;
  id: string;
  title: string;
  created: string;
  dueDate: string;
  priority:string;
  subtasks: string[];
  assignedBy : string;
  assignedTo : string;
  progress: number;
};


function AssignedTaskPage() {
  const [username,setUsername] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);  
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [searchValue, setsearchValue] = useState('');
    const [userId, setUserId] = useState(""); // Get from Firebase Auth
      
      useEffect(() => {
        
        const storedUid = localStorage.getItem('userId');
        
        if (storedUid) {
          setUserId(storedUid);
        }
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
      }, []);
      
      const fetchTasks = async (assignedPage = false) => {
        const storedUsername = localStorage.getItem('username'); 
        try {
          const response = await fetch(
            `/api/tasks?userId=${userId}&assignedPage=${assignedPage}&username=${storedUsername}` // Add username as a query parameter
          );
          const text = await response.text();
          // console.log('Response Text:', text);
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
      
          const data = JSON.parse(text);
          setTasks(data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        if (userId) {
          fetchTasks(true); // Pass true for AssignedTo page
        }
      }, [userId]);
      
      const handleAddTask = async (newTask: Task) => {
        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newTask, userId }),
        });
        const data = await response.json();
        setTasks((prevTasks) => [data, ...prevTasks]);
      };
    
      const onUpdateTask = async (updatedTask: Task) => {
        const response = await fetch(`/api/tasks/${updatedTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
      
        if (!response.ok) {
          console.error('Failed to update task');
          return;
        }
      
        const data = await response.json();
        setTasks((prevTasks) => {
          return prevTasks.map((task) =>
              task._id === updatedTask._id ? { ...task, ...data } : task
          );
      });
      };
      
      const onDeleteTask = async (taskId: string) => { 
        try {
          // Make the DELETE request with taskId
          const response = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
          });
      
          // Handle failure response
          if (!response.ok) {
            throw new Error('Failed to delete task');
          }
      
          // On successful deletion, remove the task from the state
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Use _id for deletion
        } catch (error) {
          console.error('Error: deleterror');
        }
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
    
      // Apply searching
      const searchTasks = sortedTasks.filter(
        (task) =>
          task.title && task.title.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    
    
    
  return (
    <div style={{ marginTop: "80px" }} className=' bg-slate-100 dark:bg-neutral-950 w-full min-h-screen flex flex-col custom:flex-row'>
      <div className=' w-full custom:w-[78%] flex flex-col gap-4 p-10 border-r-2 dark:border-r-0'>
      <div className='font-bold text-2xl sm:text-4xl mt-3 mb-5 text-slate-800 dark:text-slate-200 '>
          Hello {username}!
          </div>
        <div className='flex justify-between'>
          <SearchBar search={setsearchValue}/>
          <AssignTaskButton  onAddTask={handleAddTask}/>
        </div>
        <div className='mt-16 flex justify-between font-bold items-center flex-col md:flex-row gap-8'>
        <p className='text-[26px] font-bold text-neutral-700 dark:text-slate-200 '>My Assigned Tasks</p>
        <SortByButton onCategoryChange={setCategory} onSortByChange={setSortBy}/>
    </div>
        <div className='overflow-auto flex gap-10 flex-wrap justify-center mt-7'>
        {searchTasks.length > 0 ? (
          searchTasks.map((task,item) =><AssignedTaskCard  onUpdateTask={(updatedTask) => onUpdateTask(updatedTask)}
          onDeleteTask={(taskId) => onDeleteTask(taskId)} key={task.id||item} task={task}/>)
        ) : (
          <p className="text-neutral-500 dark:text-neutral-300 text-4xl md:text-6xl font-bold mt-36">
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
