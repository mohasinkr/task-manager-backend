import { Request, Response } from "express";
import Task from "../models/Task";

export async function getTasks(_req: Request, res: Response) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTask(req: Request, res: Response) {
  const { title, description, completed, dueDate, owner } = req.body;
  try {
    const task = new Task({
      title,
      description,
      completed,
      dueDate: dueDate ?? new Date(),
      owner,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
