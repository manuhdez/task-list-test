import React from 'react';
import useFetch from '../index';

export default function UseFetchExample() {
  const [call, data, loading, error] = useFetch<string>({ url: '/test' });

  const handleClick = () => {
    call();
  };

  if (loading) return <p>Loading data</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return <button onClick={handleClick}>Get Data</button>;

  return <p>Data: {data}</p>;
}
