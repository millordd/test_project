import { Button, Collapse, CollapseProps, Flex, Modal, Space, Table, theme, Typography } from 'antd';
import { useState } from 'react';
import { CSSProperties } from 'styled-components';

import { MoreIcon } from '@shared/assets/icones';

import { AddMessages } from './components';
import { TableMessage } from './components/Table';

export const Messages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      children: <TableMessage />,
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
      <AddMessages isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      <div className="h-screen bg-white p-2">
        <Flex align="center" justify="space-between">
          <Typography.Title level={2}>Messages</Typography.Title>
          <Button type="primary" onClick={showModal}>
            Добавить
          </Button>
        </Flex>
        <Collapse expandIconPosition="right" size="large" items={getItems(panelStyle)} />
        <Space direction="vertical" />
      </div>
    </>
  );
};
