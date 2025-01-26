import { redirect, RouteObject } from 'react-router-dom';
import { localStorageManager } from 'utils/localeStorage';

import { AuthCheck } from '@shared/utils/AuthCheck';

export const routes: RouteObject[] = [
  {
    path: '/',
    async lazy() {
      const { Layout } = await import('@app/pages/Layout/Layout');
      return { Component: Layout };
    },
    children: [
      {
        index: true,
        loader: async () => {
          const token = localStorageManager.get('accessToken');
          if (token) {
            return redirect('/dashboard');
          }
          return redirect('/signIn');
        },
      },
      {
        path: 'signIn',
        async lazy() {
          const { SignIn } = await import('@pages/SignIn');
          return {
            Component: () => (
              <>
                <AuthCheck>
                  <SignIn />
                </AuthCheck>
              </>
            ),
          };
        },
      },
      {
        path: 'dashboard',
        async lazy() {
          const { DashboardLayout } = await import('@app/pages/Layout/DashboardLayout');
          return { Component: DashboardLayout };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { User } = await import('@app/pages/User');
              return { Component: User };
            },
          },
          {
            path: 'messages',
            async lazy() {
              const { Messages } = await import('@app/pages/Messages');
              return { Component: Messages };
            },
          },
        ],
      },
    ],
  },
];
