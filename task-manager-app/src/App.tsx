import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './type';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
const API_URL = process.env.REACT_APP_API_URL;


const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        // Fetch tasks from the server
        axios.get(`${API_URL}/tasks`)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = (task: Omit<Task, 'id'>) => {
        axios.post(`${API_URL}/tasks`, task)
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.error('Error adding task:', error));
    };

    const deleteTask = (id: number) => {
        axios.delete(`${API_URL}/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(error => console.error('Error deleting task:', error));
    };

    const updateTask = (updatedTask: Task) => {
        axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask)
            .then(response => {
                const updatedTasks = tasks.map(task => task.id === updatedTask.id ? response.data : task);
                setTasks(updatedTasks);
            })
            .catch(error => console.error('Error updating task:', error));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
                Task Manager
            </Typography>
            <TaskForm onAdd={addTask} />
            <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        </Container>
    );
};

export default App;
