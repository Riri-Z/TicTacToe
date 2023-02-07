import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from './components/Game';
test('renders Game', () => {
  render(<Game />);
  const linkElement = screen.getByText(/Tic Tac Toe/i);
  expect(linkElement).toBeInTheDocument();
});
