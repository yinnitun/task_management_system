import { db } from '../config/database';

interface Task {
  id?: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class TaskModel {
  static async findAll(): Promise<Task[]> {
    const database = await db;
    return database.all<Task[]>('SELECT * FROM tasks');
  }

  static async findById(id: number): Promise<Task | undefined> {
    const database = await db;
    return database.get<Task>('SELECT * FROM tasks WHERE id = ?', id);
  }

  static async create(task: Task): Promise<number> {
    const database = await db;
    const result = await database.run(
      'INSERT INTO tasks (title, description, isCompleted) VALUES (?, ?, ?)',
      task.title,
      task.description,
      task.isCompleted
    );
    return result.lastID ?? -1; // Ensure it returns a number
  }

  static async update(id: number, task: Partial<Task>): Promise<number> {
    const database = await db;
    const result = await database.run(
      `UPDATE tasks SET 
        title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        isCompleted = COALESCE(?, isCompleted), 
        updatedAt = CURRENT_TIMESTAMP 
        WHERE id = ?`,
      task.title,
      task.description,
      task.isCompleted,
      id
    );
    return result.changes ?? 0; // Ensure it returns a number
  }

  static async delete(id: number): Promise<number> {
    const database = await db;
    const result = await database.run('DELETE FROM tasks WHERE id = ?', id);
    return result.changes ?? 0; // Ensure it returns a number
  }
}
