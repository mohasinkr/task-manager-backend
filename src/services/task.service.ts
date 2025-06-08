import Task from "@/models/Task";
import { Types } from "mongoose";

const getTasksService = async (ownerId?: Types.ObjectId) => {
  const tasks = await Task.find({ owner: ownerId});
  return tasks;
};

export { getTasksService };

