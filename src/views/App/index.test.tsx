import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';

describe('App view', () => {
  test('Renders the app container', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
