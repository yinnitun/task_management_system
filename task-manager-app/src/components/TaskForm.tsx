import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';
import { Task } from '../type';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({ title: '', description: '', isCompleted: false });
  const handleCancel = () => {
    navigate('/');
  };


  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
    setTask(response.data);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
    } else {
      await axios.post('http://localhost:5000/api/tasks', task);
    }
    navigate('/');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update Task' : 'Create Task'}
        </Button>

        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleCancel} 
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
