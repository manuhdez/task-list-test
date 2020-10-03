import { TaskRecord } from 'components/TasksList/Task/Task';
import { useQuery } from 'react-query';

export default function useGetTodos() {
  const fetchTodos = async (): Promise<TaskRecord[]> => {
    const fetchResponse = await fetch('http://localhost:4000/tasks');
    return await fetchResponse.json();
  };

  return useQuery('todos', fetchTodos);
}
