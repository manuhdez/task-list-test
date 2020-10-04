import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskRecord } from 'types/todo';
import { useEditTodo, useRemoveTodo } from 'hooks/useFetchTodos';
import Task from './Task';

jest.mock('hooks/useFetchTodos');

describe('Task', () => {
  const editMock = jest.fn();
  const removeMock = jest.fn();

  let mockProps: TaskRecord;
  beforeEach(() => {
    editMock.mockClear();
    removeMock.mockClear();

    (useEditTodo as jest.Mock).mockImplementation(() => [editMock]);
    (useRemoveTodo as jest.Mock).mockImplementation(() => [removeMock]);

    mockProps = {
      id: 32,
      title: 'Feed the cat',
      createdAt: 1600035373810,
      done: false,
      doneAt: null,
    };
  });

  test('Displays the title of the task and its done status', () => {
    render(<Task {...mockProps} />);

    expect(screen.getByText('Feed the cat')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('Marks the task as done after a user clicks on the checkbox', () => {
    render(<Task {...mockProps} />);

    const checkbox = screen.getByRole('checkbox');
    expect(editMock).not.toHaveBeenCalled();

    fireEvent.click(checkbox);
    expect(editMock).toHaveBeenCalledTimes(1);
  });

  test('User can edit an incomplete task', () => {
    render(<Task {...mockProps} />);

    const editButton = screen.getByTitle('Edit');
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    const cancelButton = screen.getByTitle('Cancel');
    const saveButton = screen.getByTitle('Save');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(editMock).toHaveBeenCalledTimes(0);

    fireEvent.click(saveButton);
    expect(editMock).toHaveBeenCalledTimes(1);
  });

  test('User can remove a done task', () => {
    mockProps.done = true;
    render(<Task {...mockProps} />);

    const removeButton = screen.getByTitle('Remove');
    expect(removeButton).toBeInTheDocument();
    expect(removeMock).toHaveBeenCalledTimes(0);

    fireEvent.click(removeButton);
    expect(removeMock).toHaveBeenCalledTimes(1);
  });
});
