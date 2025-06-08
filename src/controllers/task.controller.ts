import { UnauthorizedError } from "@/exceptions/error";
import { deleteTaskService, getTasksService, updateTaskService } from "@/services/task.service";
import { errorResponse, successResponse } from "@/utils/http-response";
import { Request, Response } from "express";
import Task from "../models/Task";

export async function getTasks(req: Request, res: Response) {
  try {
    const ownerId = req.user?.id;

    console.log(ownerId, "owner id ");

    if (!ownerId) {
      throw new UnauthorizedError("Unauthorized");
    }

    const tasks = await getTasksService(ownerId);
    res.json(successResponse(tasks));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Internal Server Error"));
  }
}

export async function createTask(req: Request, res: Response) {
  const { title, description, completed, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      completed,
      dueDate: dueDate ?? new Date(),
      owner: req.user?.id,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Internal Server Error"));
  }
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, completed, dueDate } = req.body;
  try {
    const task = await updateTaskService(id, {
      title,
      description,
      completed,
      dueDate,
    });
    res.json(successResponse(task));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Internal Server Error"));
  }
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const task = await deleteTaskService(id);
    res.json(successResponse(task));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Internal Server Error"));
  }
}
