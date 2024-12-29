import React, { useState, useRef, useEffect } from "react";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from '@mui/icons-material/Add';

type Task = {
    id: number;
    title: string;
    created: string;
    dueDate: string;
    priority: string;
    subtasks: string[];
    progress: number;
};

type Props = {
    task: Task;
    onUpdateTask: (updatedTask: Task) => void;
    onDeleteTask: (taskId: number) => void;
};

const ProjectCard = ({ task, onUpdateTask, onDeleteTask }: Props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showEditWindow, setShowEditWindow] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const menuRef = useRef<HTMLDivElement | null>(null);
    
    const handleEditToggle = () => {
        setShowEdit((prev) => !prev);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowEdit(false);
        }
    };

    const handleDeleteButton = () => {
        onDeleteTask(task.id);
    };

    const handleSubmitEdit = () => {
        onUpdateTask(editedTask);
        setShowEditWindow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
        <div className="size-80 rounded-lg gap-3 flex flex-col justify-between bg-slate-300 dark:bg-zinc-800 p-3 border-[4px] border-transparent hover:border-blue-800 dark:hover:border-slate-300">
            {/* Project icon and title */}
            <div className="flex gap-4 justify-around">
                {/* Icon */}
                <div className="items-center flex">
                    <SplitscreenIcon
                        sx={{ fontSize: "30px" }}
                        className="text-slate-100 bg-blue-800 rounded-md p-1 m-1"
                    />
                </div>
                {/* Title */}
                <div className="flex flex-col mr-10">
                    <span className="text-xl font-semibold text-blue-800 dark:text-slate-100">
                        {task.title}
                    </span>
                    <span className="mt-1 flex gap-5">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-100">
                            {task.created}
                        </span>
                        {task.priority === "high" ? (
                            <span className="h-5 font-semibold bg-red-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs">
                                {task.priority}
                            </span>
                        ) : task.priority === "med" ? (
                            <span className="h-5 font-semibold bg-orange-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs">
                                {task.priority}
                            </span>
                        ) : (
                            <span className="h-5 font-semibold bg-green-600 text-white pl-1 pr-1 items-center flex rounded-md text-xs">
                                {task.priority}
                            </span>
                        )}
                    </span>
                </div>
                {/* More Icon */}
                <div className="relative items-center flex">
                    <Tooltip title="Edit">
                        <MoreVertIcon
                            sx={{ fontSize: "30px" }}
                            className="text-slate-800 dark:text-slate-100 cursor-pointer"
                            onClick={handleEditToggle}
                        />
                    </Tooltip>
                    {showEdit && (
                        <div
                        ref={menuRef}
                        className="absolute top-8 right-0 bg-blue-800 dark:bg-slate-200  text-slate-300 dark:text-blue-800 rounded-md flex flex-col shadow-lg z-10"
                        >
                            <button onClick={() => setShowEditWindow(true)} className="font-semibold border-b-2 pb-2 px-4 hover:text-blue-800 hover:bg-slate-300 hover:dark:bg-blue-800 hover:dark:text-neutral-300">
                                Edit
                            </button>
                            <button onClick={handleDeleteButton} className="font-semibold pt-1 px-4 hover:text-blue-800 hover:bg-slate-300 hover:dark:bg-blue-800 hover:dark:text-neutral-300">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 ? (
                <ul>
                    {task.subtasks.map((subtask, index) => (
                        <li key={index} className="flex gap-2 items-center">
                            <CircleIcon
                                sx={{ fontSize: "9px" }}
                                className="text-slate-700 dark:text-slate-400"
                            />
                            <span className="text-slate-600 dark:text-slate-100">
                                {subtask}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <h1 className="text-blue-600 dark:text-slate-300 font-sans font-bold bg-blue-700 rounded-lg p-1 m-1 text-lg">
                    No Subtasks in this task
                </h1>
            )}

            {/* Footer */}
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
                    <p className="text-blue-600 dark:text-slate-100">
                        {task.progress}%
                    </p>
                </div>
            </div>
        </div>

        {/* Edit Window */}
        {showEditWindow && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-5 w-96">
            <h2 className="text-lg font-bold text-blue-800 dark:text-slate-100">
                Edit Task
            </h2>
            <div className="mt-4">
                <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300">Progress</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={editedTask.progress}
                        onChange={(e) => setEditedTask({ ...editedTask, progress: parseInt(e.target.value) })}
                        className="w-full p-2 mb-2 rounded border text-neutral-800"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300">Due Date</label>
                    <input
                        type="date"
                        value={editedTask.dueDate}
                        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                        className="w-full p-2 mb-2 rounded border text-neutral-800"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button
                    className="bg-gray-300 dark:bg-neutral-700 text-gray-800 dark:text-white rounded px-4 py-2"
                    onClick={() => setShowEditWindow(false)}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-800 text-white rounded px-4 py-2"
                    onClick={handleSubmitEdit}
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
)}

        </>
    );
};

export default ProjectCard;
