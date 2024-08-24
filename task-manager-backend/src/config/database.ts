import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export const db = open({
  filename: path.resolve(__dirname, 'taskmanager.sqlite'),
  driver: sqlite3.Database,
});

// Initialize the database and create tables if they don't exist
(async () => {
  const database = await db;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      isCompleted BOOLEAN DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
})();
