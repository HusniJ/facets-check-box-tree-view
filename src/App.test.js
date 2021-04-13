import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header for tree view', () => {
  render(<App />);
  const linkElement = screen.getByText(/Categories Tree View/);
  expect(linkElement).toBeInTheDocument();
});
