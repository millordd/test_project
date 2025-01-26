import { Outlet } from 'react-router-dom';

import { Sidebar } from '@components/index';
import { AuthProvider } from '@shared/utils/AuthProvider';

export const DashboardLayout = () => {
  return (
    <>
      <AuthProvider>
        <div className="flex flex-row overflow-hidden">
          <div className="overflow-hidden">
            <Sidebar />
          </div>

          <div className="flex-1 h-full overflow-y-auto bg-[#F3F5F8] dark:bg-dark-mode-base">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </>
  );
};
