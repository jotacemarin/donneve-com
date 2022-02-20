import { render, screen } from '@testing-library/react';
import Navbar from './view';

test('renders E-bola Strike link', () => {
  render(<Navbar />);
  const linkElement = screen.getByText(/E-bola Strike/i);
  expect(linkElement).toBeInTheDocument();
});
