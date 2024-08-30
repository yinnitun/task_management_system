import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Container } from '@mui/material';
import { Task } from '../type';
import { useNavigate } from 'react-router-dom';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/new')}
        style={{ marginBottom: '20px' }}
      >
        Create New Task
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit/${task.id}`)} variant="contained">Edit</Button>
                <Button onClick={() => handleDelete(task.id!)} variant="contained" color="secondary" style={{ marginLeft: '10px' }} >Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TaskList;
