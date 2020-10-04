import { useQuery, useMutation } from 'react-query';
import { queryCache } from 'views/App';
import { TaskData, TaskRecord } from 'types/todo';

export function useGetTodos() {
  const fetchTodos = async (): Promise<TaskRecord[]> => {
    const fetchResponse = await fetch('http://localhost:4000/tasks');
    return fetchResponse.json();
  };

  return useQuery('todos', fetchTodos);
}

export const useCreateTodo = () => {
  const addTodo = async (todo: TaskData): Promise<TaskRecord> => {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchResponse = await fetch(
      'http://localhost:4000/tasks',
      fetchOptions
    );
    return fetchResponse.json();
  };

  return useMutation(addTodo, {
    onSuccess: () => queryCache.refetchQueries('todos'),
  });
};

export const useEditTodo = () => {
  const editTodo = async (todo: TaskRecord) => {
    const fetchOptions = {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchResponse = await fetch(
      `http://localhost:4000/tasks/${todo.id}`,
      fetchOptions
    );
    return fetchResponse.json();
  };

  return useMutation(editTodo, {
    onSuccess: () => queryCache.refetchQueries('todos'),
  });
};

export const useRemoveTodo = () => {
  const removeTodo = async (id: number) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchResponse = await fetch(
      `http://localhost:4000/tasks/${id}`,
      fetchOptions
    );
    return fetchResponse.json();
  };

  return useMutation(removeTodo, {
    onSuccess: () => queryCache.refetchQueries('todos'),
  });
};
