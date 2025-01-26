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

          <div className="flex-1 p-5 h-full overflow-y-auto bg-[#F1F1F1]">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
    </>
  );
};
