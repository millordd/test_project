import { Button, Collapse, CollapseProps, Flex, theme, Typography } from 'antd';
import { useState } from 'react';
import { CSSProperties } from 'styled-components';

import { MoreIcon } from '@shared/assets/icones';

import { AddUser, TableUser } from './components';

export const User = () => {
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    remove: false,
  });
  const handleToggle = (type: 'add' | 'edit' | 'remove') => {
    setModalState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const paylaod = {
    filters: {
      userName: '',
      email: '',
      phoneNumber: '',
    },
    orderBy: {
      orderColumn: 1,
      direction: 0,
    },
    pageInfo: {
      pageNumber: 1,
      pageSize: 10,
    },
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-3">
          <MoreIcon /> <span>ПОИСК</span>
        </div>
      ),
      children: <Typography.Paragraph>text</Typography.Paragraph>,
      style: panelStyle,
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-3">
          <MoreIcon /> <span>Результаты поиска</span>
        </div>
      ),
      children: <TableUser payload={paylaod} />,
      style: panelStyle,
    },
  ];

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <>
      <AddUser isModalOpen={modalState.add} handleCancel={() => handleToggle('add')} />
      <div className="h-[85vh] bg-white p-2">
        <Flex align="center" justify="space-between">
          <Typography.Title level={2}>Users</Typography.Title>
          <div>
            {/* <Button type="primary" size="large" className="mr-2" onClick={() => handleToggle('addSeveral')}>
              Добавить несколько
            </Button> */}
            <Button type="primary" size="large" onClick={() => handleToggle('add')}>
              Добавить User
            </Button>
          </div>
        </Flex>
        {/* <div className="max-h-screen overflow-y-auto"> */}
        <Collapse expandIconPosition="right" size="large" className="max-h-[80vh]" items={getItems(panelStyle)} />
        {/* </div> */}
      </div>
    </>
  );
};
