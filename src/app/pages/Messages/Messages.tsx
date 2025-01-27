import { Button, Collapse, CollapseProps, Flex, Space, theme, Typography } from 'antd';
import { useState } from 'react';
import { CSSProperties } from 'styled-components';

import { MoreIcon } from '@shared/assets/icones';

import { AddMessages, AddSeveralMessage, MessageFilter } from './components';
import { TableMessage } from './components/TableMessage';

export const Messages = () => {
  const [modalState, setModalState] = useState({
    addOne: false,
    addSeveral: false,
  });
  const handleToggle = (type: 'addOne' | 'addSeveral') => {
    setModalState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  const [filters, setFilters] = useState({
    filters: {
      recipient: '',
      sentAt: new Date().toISOString(),
      startDate: null,
      endDate: null,
    },
    orderBy: {
      orderColumn: 1,
      direction: 0,
    },
  });

  // console.log(filters);

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-3">
          <MoreIcon /> <span>ПОИСК</span>
        </div>
      ),
      children: <MessageFilter setFilterData={setFilters} />,
      style: panelStyle,
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-3">
          <MoreIcon /> <span>Результаты поиска</span>
        </div>
      ),
      children: <TableMessage params={filters} />,
      style: panelStyle,
    },
  ];

  const { token } = theme.useToken();

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <>
      <AddSeveralMessage isModalOpen={modalState.addSeveral} handleCancel={() => handleToggle('addSeveral')} />
      <AddMessages isModalOpen={modalState.addOne} handleCancel={() => handleToggle('addOne')} />
      <div className="h-[85vh] bg-white p-2">
        <Flex align="center" justify="space-between">
          <Typography.Title level={2}>Messages</Typography.Title>
          <div>
            <Button type="primary" size="large" className="mr-2" onClick={() => handleToggle('addSeveral')}>
              Добавить несколько
            </Button>
            <Button type="primary" size="large" onClick={() => handleToggle('addOne')}>
              Добавить
            </Button>
          </div>
        </Flex>
        <Collapse
          expandIconPosition="right"
          size="large"
          items={getItems(panelStyle)}
          defaultActiveKey={['2']}
          className="max-h-[80vh]"
        />
        <Space direction="vertical" />
      </div>
    </>
  );
};
