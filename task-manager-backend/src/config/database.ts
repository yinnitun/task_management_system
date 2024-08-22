// src/database/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open SQLite database and create schema if necessary
export const openDb = async () => {
  const db = await open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  return db;
};
