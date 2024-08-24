import { Request, Response } from 'express';
import TaskModel from '../models/task';

export default class TaskController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const task = await TaskModel.findById(parseInt(req.params.id, 10));
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    const newTask = req.body;
    const id = await TaskModel.create(newTask);
    res.status(201).json({ id, ...newTask });
  }

  static async update(req: Request, res: Response): Promise<void> {
    const updatedTask = req.body;
    const rows = await TaskModel.update(parseInt(req.params.id, 10), updatedTask);
    if (rows > 0) {
      res.json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const rows = await TaskModel.delete(parseInt(req.params.id, 10));
    if (rows > 0) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  }
}
