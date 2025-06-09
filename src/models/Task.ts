import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  isCompleted: boolean;
  dueDate?: Date;
  owner: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"] },
    isCompleted: { type: Boolean, default: false },
    dueDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
