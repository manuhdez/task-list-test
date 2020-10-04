import React from 'react';

import TaskForm from 'components/TaskForm/TaskForm';
import TasksList from 'components/TasksList/TasksListWrapper';

export default function TasksListContainer() {
  return (
    <>
      <TaskForm />
      <TasksList />
    </>
  );
}
