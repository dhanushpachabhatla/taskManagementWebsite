import mongoose, { Schema, model, models } from 'mongoose';

interface ITask {
  title: string;
  created: string;
  dueDate: string;
  priority: string;
  subtasks: string[];
  progress: number;
  assignedBy?: string;
  assignedTo?: string;
  userId: string; // Store Firebase UID here
  username: string; // 
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    created: { type: String },
    dueDate: { type: String, required: true },
    priority: { type: String, enum: ['high', 'med', 'low'], default: 'med' },
    subtasks: [{ type: String }],
    progress: { type: Number, default: 0 },
    assignedBy: { type: String },
    assignedTo: { type: String },
    userId: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Task || model<ITask>('Task', TaskSchema);
