import { Outlet } from 'react-router-dom';

import { Header } from '@components/index';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
};
