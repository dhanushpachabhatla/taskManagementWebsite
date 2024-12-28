import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

type AssignTaskButtonProps = {
    onAddTask: (newTask: any) => void;
};

const AssignTaskButton = ({ onAddTask }: AssignTaskButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskData, setTaskData] = useState({
        title: "",
        dueDate: "",
        priority: "low",
        assignedTo: "",
        assignedBy: "",
        subtasks: ["", "", ""],
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        setTaskData({ ...taskData, [field]: e.target.value });
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const updatedSubtasks = [...taskData.subtasks];
        updatedSubtasks[index] = value;
        setTaskData({ ...taskData, subtasks: updatedSubtasks });
    };

    const handleSubmit = () => {
        if (taskData.title && taskData.dueDate && taskData.priority && taskData.assignedBy && taskData.assignedTo) {
            const newTask = {
                id: Date.now(),
                title: taskData.title,
                created: "Just now",
                assignedTo: taskData.assignedTo,
                assignedBy: taskData.assignedBy,
                dueDate: taskData.dueDate,
                priority: taskData.priority,
                subtasks: taskData.subtasks.filter(Boolean), // Remove empty subtasks
                progress: 0,
            };
            onAddTask(newTask);
            setTaskData({
                title: "",
                dueDate: "",
                priority: "low",
                assignedTo: "",
                assignedBy: "",
                subtasks: ["", "", ""],
            });
            setIsModalOpen(false);
        }
        else {
            if (!taskData.title) {
                alert('Please fill the Title');
            }
            else if (!taskData.dueDate) {
                alert('Please fill the Due Date');
            }
            else if (!taskData.priority) {
                alert('Please fill the Priority');
            }
            else if (!taskData.assignedBy) {
                alert('Please fill the assignedBy');
            }
            else if (!taskData.assignedTo) {
                alert('Please fill the assignedTo');
            }
        }
    };

    return (
        <>
            <div>
                <button
                    className="bg-blue-800 rounded-lg p-2 flex gap-1"
                    onClick={() => setIsModalOpen(true)}
                >
                    <AddIcon sx={{ fontSize: "22px" }} />
                    <span>Add Task</span>
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg p-5 w-96">
                        <h2 className="text-lg font-bold text-blue-800 dark:text-slate-100">
                            Add New Task
                        </h2>
                        <div className="mt-4 text-neutral-800">
                            <input
                                type="text"
                                placeholder="Title"
                                value={taskData.title}
                                onChange={(e) => handleInputChange(e, "title")}
                                className="w-full p-2 mb-2 rounded border text-neutral-800"
                            />
                            <input
                                type="date"
                                value={taskData.dueDate}
                                onChange={(e) => handleInputChange(e, "dueDate")}
                                className="w-full p-2 mb-2 rounded border text-neutral-800"
                            />
                            <input
                                type="text"
                                value={taskData.assignedTo}
                                placeholder="assign to"
                                onChange={(e) => handleInputChange(e, "assignedTo")}
                                className="w-full p-2 mb-2 rounded border text-neutral-800"
                            />
                            <input
                                type="text"
                                placeholder="assign from"
                                value={taskData.assignedBy}
                                onChange={(e) => handleInputChange(e, "assignedBy")}
                                className="w-full p-2 mb-2 rounded border text-neutral-800"
                            />
                            <select
                                value={taskData.priority}
                                onChange={(e) => handleInputChange(e, "priority")}
                                className="w-full p-2 mb-2 rounded border text-neutral-800 "
                            >
                                <option value="low">Low</option>
                                <option value="med">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {[...Array(3)].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Subtask ${index + 1}`}
                                    value={taskData.subtasks[index]}
                                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                    className="w-full p-2 mb-2 rounded border text-neutral-800"
                                />
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-300 dark:bg-neutral-700 text-gray-800 dark:text-white rounded px-4 py-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-800 text-white rounded px-4 py-2"
                                onClick={handleSubmit}
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

export default AssignTaskButton;
