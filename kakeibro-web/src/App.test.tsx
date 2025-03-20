import { render, screen } from 'testing-library-utils';

import App from './App';

test('initializing app has correct scaffold title', () => {
  render(<App />);

  const heading = screen.getByRole('heading', {
    name: /Vite \+ React/i,
  });
  expect(heading).toBeInTheDocument();
});
