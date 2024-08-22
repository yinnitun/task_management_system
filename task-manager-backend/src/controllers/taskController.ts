
import { Request, Response } from 'express';
import { openDb } from '../config/database';
import { Task } from '../models/task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const tasks = await db.all<Task[]>('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tasks', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const { name, description }: Task = req.body;
    const result = await db.run('INSERT INTO tasks (name, description) VALUES (?, ?)', [name, description]);
    const newTask = { id: result.lastID, name, description };
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const { id } = req.params;
    const { name, description }: Task = req.body;
    const result = await db.run('UPDATE tasks SET name = ?, description = ? WHERE id = ?', [name, description, id]);

    if (result.changes) {
      res.json({ id: parseInt(id), name, description });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const { id } = req.params;
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);

    if (result.changes) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
};
