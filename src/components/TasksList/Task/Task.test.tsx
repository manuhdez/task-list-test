import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import Task, { TaskProps } from './Task';

global.fetch = jest.fn();

describe('Task', () => {
  let mockProps: TaskProps;
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();

    mockProps = {
      id: 32,
      title: 'Feed the cat',
      createdAt: 1600035373810,
      done: false,
      onUpdatedTask: jest.fn(),
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
    expect(global.fetch).not.toHaveBeenCalled();

    fireEvent.click(checkbox);
    expect(global.fetch).toHaveBeenCalledTimes(1);
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
    expect(global.fetch).toHaveBeenCalledTimes(0);

    fireEvent.click(saveButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('User can remove a done task', () => {
    mockProps.done = true;
    render(<Task {...mockProps} />);

    const removeButton = screen.getByTitle('Remove task');
    expect(removeButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(0);

    fireEvent.click(removeButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
