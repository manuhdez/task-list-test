import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';
import { useCreateTodo } from 'hooks/useFetchTodos';

const mockCreateTodo = jest.fn();

jest.mock('hooks/useFetchTodos', () => ({
  useCreateTodo: () => [mockCreateTodo],
}));

describe('TaskForm', () => {
  test('A task can be added from the form', () => {
    render(<TaskForm />);

    expect(mockCreateTodo).toHaveBeenCalledTimes(0);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'This is a new task');

    expect(input).toHaveValue('This is a new task');

    const addButton = screen.getByRole('button', { name: 'Add' });
    userEvent.click(addButton);

    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
  });
});
