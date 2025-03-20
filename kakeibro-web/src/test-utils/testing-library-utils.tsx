import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router';

interface RenderWithContextOptions extends Omit<RenderOptions, 'wrapper'> {
  routerProps?: MemoryRouterProps;
}

const renderWithContext = (
  ui: ReactElement,
  { routerProps, ...options }: RenderWithContextOptions = {}
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter {...routerProps}>{children}</MemoryRouter>
    ),
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

export { renderWithContext as render };
