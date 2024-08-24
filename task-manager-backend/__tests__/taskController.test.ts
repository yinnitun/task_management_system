import { Request, Response } from 'express';
import TaskController from '../src/controllers/taskController';
import TaskModel from '../src/models/task';

// Mock the TaskModel
jest.mock('../src/models/task');

describe('TaskController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    res = {
      json: jsonMock,
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1', description: 'Test task', isCompleted: false }];
      (TaskModel.findAll as jest.Mock).mockResolvedValue(mockTasks);

      await TaskController.getAll(req as Request, res as Response);

      expect(TaskModel.findAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe('getById', () => {
    it('should return a task by ID', async () => {
      const mockTask = { id: 1, title: 'Task 1', description: 'Test task', isCompleted: false };
      req.params = { id: '1' };
      (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

      await TaskController.getById(req as Request, res as Response);

      expect(TaskModel.findById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 404 if task not found', async () => {
      req.params = { id: '1' };
      (TaskModel.findById as jest.Mock).mockResolvedValue(null);

      await TaskController.getById(req as Request, res as Response);

      expect(TaskModel.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const mockTask = { title: 'Task 1', description: 'Test task', isCompleted: false };
      const mockId = 1;
      req.body = mockTask;
      (TaskModel.create as jest.Mock).mockResolvedValue(mockId);

      await TaskController.create(req as Request, res as Response);

      expect(TaskModel.create).toHaveBeenCalledWith(mockTask);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: mockId, ...mockTask });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const mockTask = { title: 'Updated Task' };
      req.params = { id: '1' };
      req.body = mockTask;
      (TaskModel.update as jest.Mock).mockResolvedValue(1);

      await TaskController.update(req as Request, res as Response);

      expect(TaskModel.update).toHaveBeenCalledWith(1, mockTask);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task updated' });
    });

    it('should return 404 if task to update is not found', async () => {
      const mockTask = { title: 'Updated Task' };
      req.params = { id: '1' };
      req.body = mockTask;
      (TaskModel.update as jest.Mock).mockResolvedValue(0);

      await TaskController.update(req as Request, res as Response);

      expect(TaskModel.update).toHaveBeenCalledWith(1, mockTask);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });

  describe('delete', () => {
    it('should delete a task', async () => {
      req.params = { id: '1' };
      (TaskModel.delete as jest.Mock).mockResolvedValue(1);

      await TaskController.delete(req as Request, res as Response);

      expect(TaskModel.delete).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
    });

    it('should return 404 if task to delete is not found', async () => {
      req.params = { id: '1' };
      (TaskModel.delete as jest.Mock).mockResolvedValue(0);

      await TaskController.delete(req as Request, res as Response);

      expect(TaskModel.delete).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });
  });
});
