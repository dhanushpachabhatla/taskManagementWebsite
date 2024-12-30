"use client"
import React, { useEffect, useState } from 'react';
import StatsRightSideBar from '../components/common/StatsRightSideBar/StatsRightSideBar';
import ProjectCard from '../components/common/ProjectCard/ProjectCard';
import SearchBar from '../components/common/SeachBar/SearchBar';
import AddProject from '../components/common/AddProject/AddProject';
import SortByButton from '../components/common/SortByButton/SortByButton';

type Task = {
  _id: string; 
  id: string;
  title: string;
  created: string;
  dueDate: string;
  priority: string;
  subtasks: string[];
  progress: number;
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);  // Initialize as empty array
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchValue, setsearchValue] = useState('');
  const [userId, setUserId] = useState(""); // Get from Firebase Auth
  
  const fetchTasks = async () => {
    const response = await fetch(`/api/tasks?userId=${userId}`);
    const text = await response.text();
    console.log('Response Text:', text);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
  
    const data = JSON.parse(text);
    setTasks(data);  // Update tasks state with fetched data
  };
  
  useEffect(() => {
    // Get the userId from localStorage
    const storedUid = localStorage.getItem('userId');
    
    if (storedUid) {
      setUserId(storedUid);
    }
  }, []);
  
  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);  // Fetch tasks when userId is set
  
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
    <div
      style={{ marginTop: '80px' }}
      className="bg-slate-100 dark:bg-neutral-950 w-full min-h-screen flex"
    >
      <div className="w-[78%] flex flex-col gap-4 p-10 border-r-2 dark:border-r-0">
        <div className="flex justify-between">
          <SearchBar search={setsearchValue} />
          <AddProject onAddTask={handleAddTask} />
        </div>
        <div className="mt-16 flex justify-between font-bold items-center">
          <p className="text-[26px] font-bold text-neutral-700 dark:text-slate-200">My Tasks</p>
          <SortByButton onCategoryChange={setCategory} onSortByChange={setSortBy} />
        </div>
        <div className="overflow-auto flex gap-10 flex-wrap justify-center mt-7">
          {searchTasks.length > 0 ? (
            searchTasks.map((task, index) => <ProjectCard onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} key={task.id || index} task={task} />)
          ) : (
            <p className="text-neutral-500 dark:text-neutral-300 text-6xl font-bold mt-36">
              No Tasks Made!
            </p>
          )}
        </div>
      </div>
      <StatsRightSideBar task={sortedTasks} />
    </div>
  );
}

export default Dashboard;
