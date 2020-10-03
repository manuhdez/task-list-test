import React from 'react';
import Task, { TaskRecord } from './Task/Task';
import TaskList from './TaskList/TaskList';
import styles from './TasksList.module.scss';

export interface TasksListProps {
  tasks: TaskRecord[];
  fetchTasks: () => Promise<void>;
  isLoading: boolean;
  hasError: boolean;
}

export default function TasksList(props: TasksListProps) {
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

  const renderTask = (task: TaskRecord) => (
    <Task key={task.id} {...task} onUpdatedTask={props.fetchTasks} />
  );

  const incompleted = incompletedTasks && incompletedTasks.map(renderTask);
  const completed = completedTasks && completedTasks.map(renderTask);

  return (
    <div className={styles.lists_container}>
      <TaskList title="Incomplete tasks" tasks={incompleted || []} />
      <TaskList title="Done tasks" tasks={completed || []} />
    </div>
  );
}
