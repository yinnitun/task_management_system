import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TaskForm', () => {
  const mockTask = { id: 1, title: 'Task 1', description: 'Description 1', isCompleted: false };

  test('fetches and renders task data for editing', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockTask });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/edit/1']}>
          <Routes>
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByDisplayValue('Task 1')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Description 1')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Task' } });

    mockedAxios.put.mockResolvedValueOnce({});

    await act(async () => {
      fireEvent.click(screen.getByText('Update Task'));
    });

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:5000/api/tasks/1', {
        id: 1,
        title: 'Updated Task',
        description: 'Description 1',
        isCompleted: false,
      });
    });
  });
});
