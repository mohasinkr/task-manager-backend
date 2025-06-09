import { NotFoundError } from "@/exceptions/error";
import Task from "@/models/Task";
import { Types } from "mongoose";

const getTasksService = async (
  ownerId?: Types.ObjectId,
  status?: "pending" | "in-progress" | "completed"
) => {
  const tasks = await Task.find({ owner: ownerId, status });
  return tasks;
};

const updateTaskService = async (
  id: string,
  updateData: {
    title?: string;
    description?: string;
    status?: "pending" | "in-progress" | "completed";
    isCompleted?: boolean;
    dueDate?: Date;
  }
) => {
  const task = await Task.findById(id);
  if (!task) throw new NotFoundError("Task not found");

  if (updateData.title) task.title = updateData.title;
  if (updateData.description) task.description = updateData.description;
  if (updateData.status) task.status = updateData.status;
  if (updateData.dueDate) task.dueDate = updateData.dueDate;

  task.isCompleted = updateData.status === "completed";

  await task.save();
  return task;
};

const deleteTaskService = async (id: string) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new NotFoundError("Task not found");
  return task;
};

export { getTasksService, updateTaskService, deleteTaskService };
