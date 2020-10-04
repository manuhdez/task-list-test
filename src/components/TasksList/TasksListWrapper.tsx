import { useGetTodos } from 'hooks/useFetchTodos';
import React from 'react';
import Task from './Task/Task';
import TaskList from './TaskList/TaskList';
import { TaskRecord } from 'types/todo';
import styles from './TasksList.module.scss';

export default function TasksListWrapper() {
  const { isLoading, data: todos } = useGetTodos();

  const sortByCreationDate = (a: TaskRecord, b: TaskRecord) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  };

  const sortByDoneDate = (a: TaskRecord, b: TaskRecord) => {
    if (!a.doneAt || !b.doneAt) return sortByCreationDate(a, b);

    if (a.doneAt > b.doneAt) return -1;
    if (a.doneAt < b.doneAt) return 1;
    return 0;
  };

  const incompletedTasks = todos
    ?.filter((task) => !task.done)
    .sort(sortByCreationDate);

  const completedTasks = todos
    ?.filter((task) => task.done)
    .sort(sortByDoneDate);

  const renderTask = (task: TaskRecord) => <Task key={task.id} {...task} />;

  const incompleted = incompletedTasks && incompletedTasks.map(renderTask);
  const completed = completedTasks && completedTasks.map(renderTask);

  if (isLoading) return <p>Loading todos...</p>;

  return (
    <div className={styles.lists_container}>
      <TaskList title="Incomplete tasks" tasks={incompleted || []} />
      <TaskList title="Done tasks" tasks={completed || []} />
    </div>
  );
}
