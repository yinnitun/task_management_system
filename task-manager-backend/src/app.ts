// src/app.ts
import express from 'express';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));

// Middleware
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

export default app;
