import '@testing-library/jest-dom/vitest';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// Establishing API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so that they don't affect other tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
