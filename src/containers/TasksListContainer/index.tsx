import React, { useEffect } from 'react';
import useFetch from 'hooks/useFetch';

import TaskForm from 'components/TaskForm/TaskForm';
import TasksList from 'components/TasksList/TasksList';
import { TaskData, TaskRecord } from 'components/TasksList/Task/Task';

export default function TasksListContainer() {
  const [getAllTasks, tasks, loadingTasks, errorLoadingTasks] = useFetch<
    TaskRecord[]
  >({
    url: '/tasks',
  });

  const [saveNewTask, , savingNewTask, errorSavingTask] = useFetch<
    TaskRecord,
    TaskData
  >({
    url: '/tasks',
    method: 'POST',
  });

  // Fetch the list os tasks on mount
  useEffect(() => {
    if (!tasks && !loadingTasks) {
      getAllTasks();
    }
  }, [getAllTasks, tasks, loadingTasks]);

  return (
    <>
      <TaskForm
        onSave={saveNewTask}
        afterSave={getAllTasks}
        isLoading={savingNewTask}
        hasError={errorSavingTask}
      />
      <TasksList
        tasks={tasks || []}
        fetchTasks={getAllTasks}
        isLoading={loadingTasks}
        hasError={errorLoadingTasks}
      />
    </>
  );
}
