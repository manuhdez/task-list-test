import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UseApiExample from './__mocks__/useFetch.example';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ...new Response(),
    json: () => Promise.resolve('Hello world'),
  })
);

describe('useFetch', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('The data is fetched successfully after clicking the button', async () => {
    render(<UseApiExample />);

    const button = screen.getByText('Get Data');
    expect(global.fetch).toHaveBeenCalledTimes(0);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Loading data')).toBeInTheDocument();

    const dataText = await screen.findByText('Data: Hello world');
    expect(dataText).toBeInTheDocument();
  });

  test('Displays an error if the api call fails', async () => {
    render(<UseApiExample />);

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('Api error')
    );

    const button = screen.getByText('Get Data');
    expect(global.fetch).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    expect(screen.getByText('Loading data'));
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const errorMessage = await screen.findByText('Error loading data');
    expect(errorMessage).toBeInTheDocument();
  });
});
