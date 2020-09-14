import React from 'react';
import { render, screen } from '@testing-library/react';

import mockTasks from './__mocks__/tasks.json';

import TasksList, { TasksListProps } from './TasksList';
import { TaskRecord } from './Task/Task';

describe('TasksList', () => {
  const mockFetchTasks = jest.fn();

  let props: TasksListProps;
  beforeEach(() => {
    props = {
      tasks: mockTasks as TaskRecord[],
      isLoading: false,
      hasError: false,
      fetchTasks: mockFetchTasks,
    };
  });

  test('Displays two lists of tasks that can have two status: ​Incomplete​ and ​Done', () => {
    render(<TasksList {...props} />);

    expect(screen.getByText('Incomplete tasks')).toBeInTheDocument();
    expect(screen.getAllByTitle('Edit')).toHaveLength(2);

    expect(screen.getByText('Done tasks')).toBeInTheDocument();
    expect(screen.getAllByTitle('Remove task')).toHaveLength(2);
  });
});
