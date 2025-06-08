import { NotFoundError } from "@/exceptions/error";
import Task from "@/models/Task";
import { Types } from "mongoose";

const getTasksService = async (ownerId?: Types.ObjectId) => {
  const tasks = await Task.find({ owner: ownerId });
  return tasks;
};

const updateTaskService = async (
  id: string,
  updateData: {
    title?: string;
    description?: string;
    completed?: boolean;
    dueDate?: Date;
  }
) => {
  const task = await Task.findById(id);
  if (!task) throw new NotFoundError("Task not found");

  if (updateData.title) task.title = updateData.title;
  if (updateData.description) task.description = updateData.description;
  if (updateData.completed !== undefined) task.completed = updateData.completed;
  if (updateData.dueDate) task.dueDate = updateData.dueDate;

  await task.save();
  return task;
};

const deleteTaskService = async (id: string) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new NotFoundError("Task not found");
  return task;
};

export { getTasksService, updateTaskService, deleteTaskService };
