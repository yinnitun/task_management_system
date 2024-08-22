import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Task } from '../type';

interface TaskFormProps {
    onAdd: (task: Omit<Task, 'id'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName && taskDescription) {
            onAdd({ name: taskName, description: taskDescription });
            setTaskName('');
            setTaskDescription('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
            />
            <TextField
                label="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Task
            </Button>
        </Box>
    );
};

export default TaskForm;
