import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from '@shared/config/routes';

const router = createBrowserRouter(routes);
export const App = () => {
  return <RouterProvider router={router} />;
};
