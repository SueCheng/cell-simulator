import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render game board', () => {
  render(<App />);
  expect(screen.getByLabelText("game board")).toBeVisible();
});
