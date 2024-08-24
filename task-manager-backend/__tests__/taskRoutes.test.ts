import request from 'supertest';
import express from 'express';
import router from '../src/routes/taskRoutes';
import TaskController from '../src/controllers/taskController';

// Mock the TaskController methods
jest.mock('../src/controllers/taskController');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('Task Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/tasks should call TaskController.getAll', async () => {
    const getAllMock = TaskController.getAll as jest.Mock;
    getAllMock.mockImplementation((req, res) => res.status(200).json([{ id: 1, title: 'Test Task' }]));

    const response = await request(app).get('/api/tasks');

    expect(getAllMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Test Task' }]);
  });

  test('GET /api/tasks/:id should call TaskController.getById', async () => {
    const getByIdMock = TaskController.getById as jest.Mock;
    getByIdMock.mockImplementation((req, res) => res.status(200).json({ id: 1, title: 'Test Task' }));

    const response = await request(app).get('/api/tasks/1');

    expect(getByIdMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: 'Test Task' });
  });

  test('POST /api/tasks should call TaskController.create', async () => {
    const createMock = TaskController.create as jest.Mock;
    createMock.mockImplementation((req, res) => res.status(201).json({ id: 1, title: 'Test Task' }));

    const newTask = { title: 'Test Task', description: 'A new test task' };
    const response = await request(app).post('/api/tasks').send(newTask);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, title: 'Test Task' });
  });

  test('PUT /api/tasks/:id should call TaskController.update', async () => {
    const updateMock = TaskController.update as jest.Mock;
    updateMock.mockImplementation((req, res) => res.status(200).json({ message: 'Task updated' }));

    const updatedTask = { title: 'Updated Test Task' };
    const response = await request(app).put('/api/tasks/1').send(updatedTask);

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Task updated' });
  });

  test('DELETE /api/tasks/:id should call TaskController.delete', async () => {
    const deleteMock = TaskController.delete as jest.Mock;
    deleteMock.mockImplementation((req, res) => res.status(200).json({ message: 'Task deleted' }));

    const response = await request(app).delete('/api/tasks/1');

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Task deleted' });
  });
});
