import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm, { TaskFormProps } from './TaskForm';

describe('TaskForm', () => {
  const mockOnSave = jest.fn();
  const mockAfterSave = jest.fn();

  let props: TaskFormProps;
  beforeEach(() => {
    props = {
      onSave: mockOnSave,
      afterSave: mockAfterSave,
      isLoading: false,
      hasError: false,
    };
  });

  test('A task can be added from the form', () => {
    render(<TaskForm {...props} />);

    expect(mockOnSave).toHaveBeenCalledTimes(0);

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'This is a new task');

    expect(input).toHaveValue('This is a new task');

    const addButton = screen.getByRole('button', { name: 'Add' });
    userEvent.click(addButton);

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });
});
