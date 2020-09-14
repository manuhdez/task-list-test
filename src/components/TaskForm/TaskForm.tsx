import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TaskData } from 'components/TasksList/Task/Task';
import styles from './TaskForm.module.scss';

export interface TaskFormProps {
  onSave: (body?: TaskData) => Promise<void>;
  afterSave: () => Promise<void>;
  isLoading: boolean;
  hasError: boolean;
}

export default function TaskForm(props: TaskFormProps) {
  const { isLoading, hasError, onSave, afterSave } = props;
  const [task, setTask] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Should show a validation message to the user
    if (!task || isLoading) return;

    const newTask = {
      title: task,
      done: false,
      createdAt: Date.now(),
      doneAt: null,
    };

    await onSave(newTask);
    if (!hasError) {
      setTask('');
      afterSave();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.task_form}>
      <label htmlFor="new-task">
        <h3>Add a new task</h3>
      </label>
      <div className={styles.form_input}>
        <input
          type="text"
          id="new-task"
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button>Add</button>
      </div>
    </form>
  );
}
