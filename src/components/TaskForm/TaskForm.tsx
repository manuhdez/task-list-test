import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './TaskForm.module.scss';
import Label from './Label/Label';
import TaskInput from './TaskInput/TaskInput';
import { useCreateTodo } from 'hooks/useFetchTodos';

export default function TaskForm() {
  const [task, setTask] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [addTodo] = useCreateTodo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!task) return;

    setIsSaving(true);

    const newTask = {
      title: task,
      done: false,
      createdAt: Date.now(),
      doneAt: null,
    };

    addTodo(newTask, {
      onSuccess: () => {
        setTask('');
      },
      onSettled: () => {
        setIsSaving(false);
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.task_form}>
      <Label text="Add a new task" htmlFor="new-task" />
      <TaskInput
        task={task}
        inputId="new-task"
        handleInputChange={handleInputChange}
        disabled={isSaving}
        buttonText="Add"
      />
    </form>
  );
}
