import { render, screen } from '@testing-library/react';

import App from './App';

test('initializing app has correct scaffold title', () => {
  render(<App />);

  const heading = screen.getByRole('heading', {
    name: /Vite \+ React/i,
  });
  expect(heading).toBeInTheDocument();
});
