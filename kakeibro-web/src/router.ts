import { createBrowserRouter } from 'react-router';
import App from './App';
import { Login } from './features';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    // children: [
    //   {
    //     path: 'shows/:showId',
    //     Component: Show,
    //     loader: ({ request, params }) =>
    //       fetch(`/api/show/${params.id}.json`, {
    //         signal: request.signal,
    //       }),
    //   },
    // ],
  },
  {
    path: '/login',
    Component: Login,
  },
]);

export { router };
