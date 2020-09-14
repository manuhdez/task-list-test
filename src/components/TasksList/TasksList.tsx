import React from 'react';
import Task, { TaskRecord } from './Task/Task';
import styles from './TasksList.module.scss';

interface Props {
  tasks: TaskRecord[];
  fetchTasks: () => Promise<void>;
  isLoading: boolean;
  hasError: boolean;
}

export default function TasksList(props: Props) {
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

  const incompletedTasks = props.tasks
    .filter((task) => !task.done)
    .sort(sortByCreationDate);

  const completedTasks = props.tasks
    .filter((task) => task.done)
    .sort(sortByDoneDate);

  return (
    <div className={styles.lists_container}>
      <ul>
        <h3>Incomplete tasks</h3>
        {incompletedTasks.map((task) => (
          <Task key={task.id} {...task} onUpdatedTask={props.fetchTasks} />
        ))}
      </ul>
      <ul hidden={!completedTasks.length}>
        <h3>Done tasks</h3>
        {completedTasks.map((task) => (
          <Task key={task.id} {...task} onUpdatedTask={props.fetchTasks} />
        ))}
      </ul>
    </div>
  );
}
