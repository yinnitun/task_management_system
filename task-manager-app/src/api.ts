import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task: { title: string; description: string }) => axios.post(`${API_URL}/tasks`, task);
export const deleteTask = (id: number) => axios.delete(`${API_URL}/tasks/${id}`);
