import React from 'react';
import { render, screen } from '@testing-library/react';

import TasksListWrapper from './TasksListWrapper';

import mockTasks from './__mocks__/tasks.json';
import { useGetTodos } from 'hooks/useFetchTodos';

jest.mock('hooks/useFetchTodos', () => ({
  useGetTodos: jest.fn(() => []),
  useEditTodo: jest.fn(() => [jest.fn()]),
  useRemoveTodo: jest.fn(() => [jest.fn()]),
}));

describe('TasksListWrapper', () => {
  beforeEach(() => {
    (useGetTodos as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: mockTasks,
    }));
  });
  test('Displays two lists of tasks that can have two status: ​Incomplete​ and ​Done', () => {
    render(<TasksListWrapper />);

    expect(screen.getByText('Incomplete tasks')).toBeInTheDocument();
    expect(screen.getAllByTitle('Edit')).toHaveLength(2);

    expect(screen.getByText('Done tasks')).toBeInTheDocument();
    expect(screen.getAllByTitle('Remove task')).toHaveLength(2);
  });
});
