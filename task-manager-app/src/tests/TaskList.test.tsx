
import React from 'react';
import TaskList from '../components/TaskList';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TaskList Component', () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', isCompleted: false },
    { id: 2, title: 'Task 2', description: 'Description 2', isCompleted: false },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: tasks });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders tasks correctly', async () => {
    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/tasks');

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });
});
