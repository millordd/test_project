import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';

export const Sidebar = () => {
  const StyledMenu = styled(Menu)`
    width: 250px;
    height: 100vh;
    background-color: #161616;
    // color: #b7b9bd;

    .ant-menu-item {
      color: #b7b9bd;
    }

    .ant-menu-item:hover {
      color: #b7b9bd !important; /* Static color for all items */
      transition:
        background-color 0.3s ease,
        color 0.3s ease;
    }

    .ant-menu-item-selected {
      background-color: #3b82f6; /* Selected item background color */
      color: white; /* Selected item text color */
    }
  `;
  const path = window.location.pathname;

  const selectedKey = () => {
    if (path === '/dashboard') {
      return '1';
    }
    if (path === '/map') {
      return '2';
    }
    return '1';
  };
  return (
    <>
      <StyledMenu
        mode="vertical"
        defaultSelectedKeys={[selectedKey()]}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to="/dashboard">Users</Link>,
          },
          {
            key: '2',
            icon: <AppstoreOutlined />,
            label: <Link to="/dashboard/messages">Messages</Link>,
          },
        ]}
      />
    </>
  );
};
