import React from 'react';
import TasksListContainer from 'containers/TasksListContainer';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

export const queryCache = new QueryCache();

export default function App() {
  return (
    <main>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <TasksListContainer />
      </ReactQueryCacheProvider>
    </main>
  );
}
