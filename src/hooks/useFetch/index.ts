import { useState } from 'react';

export interface FetchParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
}

export type UseFetchData<R, B = void> = [
  (body?: B) => Promise<void>,
  R | undefined,
  boolean,
  boolean
];

/**
 * ### Returns the data needed to perform a fetch call and track the response, loading and error state.
 * **Receives two generic type params:**
 * - T for the response data
 * - P (optional) for the body contents
 */
export default function useFetch<R, B = void>(
  params: FetchParams
): UseFetchData<R, B> {
  const baseUrl = 'http://localhost:4000';

  const [data, setData] = useState<R>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { url, method = 'GET', headers } = params;

  const call = async (body?: B) => {
    setHasError(false);
    setIsLoading(true);

    try {
      const options = {
        method,
        ...(body && { body: JSON.stringify(body) }),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`${baseUrl}${url}`, options);
      const data: R | undefined = await response.json();
      if (data) setData(data);
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [call, data, isLoading, hasError];
}
